const {instance} = require("../config/razorpay");
const Course = require("../models/Course");
const User = require("../models/User");
const mailSender = require("../utils/mailSender");
const {courseEnrollmentEmail} = require("../mail/templates/courseEnrollmentEmail");
const crypto = require("crypto");
const { default: mongoose } = require("mongoose");

exports.capturePayment = async(req,res)=> {
     try{

         // take courses Id from req and userId from user.id
         const { coursesId } = req.body ; 
         const userID = req.user.id;

         //validation check all required data ok or not
         if(!coursesId || !userID)
         {
             return res.status(400).json({
                 success:false,
                 message:"could'nt get req data",
             })
         }

         let totalAmount = 0;
         

         for(let courseId of coursesId)
          {//is await needed here
            let courseIdResponse = await Course.findById(courseId).select("price");
             if(!courseIdResponse)
             {
                 return res.status(401).json({success:false ,message : "Course Id not match"});
             }
             console.log("couresIdResponse", courseIdResponse);
             totalAmount += courseIdResponse.price;
          }
 
          const student = await User.findById(userID)

         //  if(student.accountType == "Instructor")
         //  {
         //     return res.status(401).json({
         //        success:false,
         //        message:"Instructor can't Buy course"
         //     })
         //  }
//check user is already enrolled in any course if true return success false

          for(let x=0 ; x < coursesId.length ; x++)
          {
            let courseIdOfObjectType = new mongoose.Types.ObjectId(coursesId[x]);
             if(student.courses.includes(courseIdOfObjectType))
             {
                 return res.status(400).json({
                    success:false,
                    message:"You already enrolled in courses",
                 })
             }
          }

          try{
            const paymentResponse = await instance.orders.create({
                amount: totalAmount*100,
                currency:"INR",
                receipt:Date.now().toString(),
             })
             console.log("Payment response",paymentResponse);
             return res.status(200).json({
                success:true,
                message:"Payment Successful",
                data:paymentResponse,
             })
    
        }catch(error)
        {
             console.log("error in payment response",error)
             return res.status(402).json({
                success:false,
                message:"error in payment capture response",
                error:error,
             })
        }
    
     } catch(error)
        {
            console.log(error);
            res.status(500).json({
                success:false,
                message:"Failed in capturePayment inside parent catch",
                error : error
            })
     }
}
// verify payment signature 
 
exports.verifyPayment = async(req,res) => {
         try {
               const {razorpay_order_id, razorpay_payment_id,razorpay_signature,coursesId} = req.body;
               const userId  = req.user.id;

               const expectedSignature = await crypto.createHmac("sha256",process.env.RAZORPAY_SECRET)
               .update((razorpay_order_id + "|" + razorpay_payment_id).toString()).digest("hex");
    
                 if(expectedSignature !== razorpay_signature)
                 {
                      console.log("Generated Signature:",expectedSignature + "\n" + "RazorPaysignature:",razorpay_signature );
                        return res.status(400).json({
                            success:false,
                            message:"Could not match signature",
                        })
                 }

               await enrolledInCourse(coursesId , userId , res);

         }catch(error) {
            console.log("error in catch of verify payment", error);
              return res.status(500).json({
                 success:false,
                 message:"Could not verify payment",
                 error:error
              })
         }
}

async function enrolledInCourse(coursesId , userId ,res)
{
     try{
           //do validation 
           if(!coursesId || !userId || !res)
           {
             return res.status(500).json({
                success:false,
                message:"error in enrolledInCourse validation",
             })
           }
           let courseNames = [];
           for(let courseId of coursesId)
           {
              const pushUserInCourse = await Course.findByIdAndUpdate(courseId,{
                $push:{
                    studentsEnrolled:userId
                }
              },{
                new:true
              })
              if(!pushUserInCourse)
              {
                 return res.status(400).json({
                    success:false,
                    message:"error while enrolling user in course",
                 })
              }
              courseNames.push(pushUserInCourse.courseName);
           }
        
          const userInCourses = await User.findByIdAndUpdate(userId,{
             $push:{
                courses:coursesId
             }
           },{
             new:true
           })

           if(!userInCourses)
           {
              return res.status(400).json({
                 success:false,
                 message:"Error while pushing courses into userSchema",
              })
           } 

        const mailresponse = await mailSender(userInCourses.email,`Your are enrolled in ${courseNames.toString().split(",").join(" ")} .`,courseEnrollmentEmail(courseNames.toString().split(",").join(" ")),userInCourses.firstName)
           
           console.log("mail respnose " , mailresponse);
           return res.status(200).json({
            success:true,
            message:"Your are enrolled in courses"
           })


     }catch(error){

        console.log("error in parent catch of enrolled function",error);
        return res.status(400).json({
            success:false,
            message:"error in parent catch of enrolled function",
            error:error
         })
     }
}

exports.sendPaymentSuccessEmail = async(req,res) =>
{
     try{
         const {orderId , paymentId, amount} = req.body;

         const userId = req.user.id;
         const emailId =  req.user.email; 

         if(!orderId || !paymentId || !amount || !userId || !emailId)
         {
             
            return res.status(500).json({
                success:false,
                message:"Please provide all the fields",
             });

         }

         try{
            //  const enrolledStudent = await User.findById(userId);
             
          const responseOfEmail = await mailSender(emailId,"Payment Recieved","Thanks for purchasing");
           
             console.log("mail of successful payment", responseOfEmail)

             return res.status(200).json({
                success:true,
                message:"mail send success",
             })

         }catch(error)
         {
            return res.status(500).json({
                success:false,
                message:"Please provide all the fields",
             });
         }

     }catch(error){
        return res.status(500).json({
            success:false,
            message:"error in send payment catch block",
            error:error,
         });
     }
}


// //capture the payment and initiate the Razorpay order
// exports.capturePayment = async (req, res) => {
//     //get courseId and UserID
//     const {course_id} = req.body;
//     const userId = req.user.id;
//     //validation
//     //valid courseID
//     if(!course_id) {
//         return res.json({
//             success:false,
//             message:'Please provide valid course ID',
//         })
//     };
//     //valid courseDetail
//     let course;
//     try{
//         course = await Course.findById(course_id);
//         if(!course) {
//             return res.json({
//                 success:false,
//                 message:'Could not find the course',
//             });
//         }

//         //user already pay for the same course
//         const uid = new mongoose.Types.ObjectId(userId);
//         if(course.studentsEnrolled.includes(uid)) {
//             return res.status(200).json({
//                 success:false,
//                 message:'Student is already enrolled',
//             });
//         }
//     }
//     catch(error) {
//         console.error(error);
//         return res.status(500).json({
//             success:false,
//             message:error.message,
//         });
//     }
    
//     //order create
//     const amount = course.price;
//     const currency = "INR";

//     const options = {
//         amount: amount * 100,
//         currency,
//         receipt: Math.random(Date.now()).toString(),
//         notes:{
//             courseId: course_id,
//             userId,
//         }
//     };

//     try{
//         //initiate the payment using razorpay
//         const paymentResponse = await instance.orders.create(options);
//         console.log(paymentResponse);
//         //return response
//         return res.status(200).json({
//             success:true,
//             courseName:course.courseName,
//             courseDescription:course.courseDescription,
//             thumbnail: course.thumbnail,
//             orderId: paymentResponse.id,
//             currency:paymentResponse.currency,
//             amount:paymentResponse.amount,
//         });
//     }
//     catch(error) {
//         console.log(error);
//         res.json({
//             success:false,
//             message:"Could not initiate order",
//         });
//     }
    

// };

// //verify Signature of Razorpay and Server

// exports.verifySignature = async (req, res) => {
//     const webhookSecret = "12345678";

//     const signature = req.headers["x-razorpay-signature"];

//     const shasum =  crypto.createHmac("sha256", webhookSecret);
//     shasum.update(JSON.stringify(req.body));
//     const digest = shasum.digest("hex");

//     if(signature === digest) {
//         console.log("Payment is Authorised");

//         const {courseId, userId} = req.body.payload.payment.entity.notes;

//         try{
//                 //fulfil the action

//                 //find the course and enroll the student in it
//                 const enrolledCourse = await Course.findOneAndUpdate(
//                                                 {_id: courseId},
//                                                 {$push:{studentsEnrolled: userId}},
//                                                 {new:true},
//                 );

//                 if(!enrolledCourse) {
//                     return res.status(500).json({
//                         success:false,
//                         message:'Course not Found',
//                     });
//                 }

//                 console.log(enrolledCourse);

//                 //find the student andadd the course to their list enrolled courses me 
//                 const enrolledStudent = await User.findOneAndUpdate(
//                                                 {_id:userId},
//                                                 {$push:{courses:courseId}},
//                                                 {new:true},
//                 );

//                 console.log(enrolledStudent);

//                 //mail send krdo confirmation wala 
//                 const emailResponse = await mailSender(
//                                         enrolledStudent.email,
//                                         "Congratulations from CodeHelp",
//                                         "Congratulations, you are onboarded into new CodeHelp Course",
//                 );

//                 console.log(emailResponse);
//                 return res.status(200).json({
//                     success:true,
//                     message:"Signature Verified and COurse Added",
//                 });


//         }       
//         catch(error) {
//             console.log(error);
//             return res.status(500).json({
//                 success:false,
//                 message:error.message,
//             });
//         }
//     }
//     else {
//         return res.status(400).json({
//             success:false,
//             message:'Invalid request',
//         });
//     }


// };