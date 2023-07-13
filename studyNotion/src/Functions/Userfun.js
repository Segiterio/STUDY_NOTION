import { setProfile } from "../Redux/Slices/user";
import razImg from "../assets/Logo/razorpay-icon.png"
import { setauth } from "../Redux/Slices/auth";
import { profilePointes,categories, coursePoints,razorpayPoints } from "../axios/services/apis";
import { endPoints } from "../axios/services/apis";
import { apiConnector } from "../axios/instance";
import {toast} from "react-toastify";
import {ResetCart} from "../Redux/Slices/cart"
import {setPaymentLoading} from "../Redux/Slices/course"
import { setLoading } from "../Redux/Slices/auth";

export const logOut = (dispatch,navigate) =>
          {  //set profile data null
             dispatch(setProfile(null))
             //set token null
             dispatch(setauth(null))
             localStorage.removeItem("token");
             localStorage.removeItem("User_SN");
             navigate("/login")
          }

export const profileUpdate = async(formData,token) =>
{ 
   try{
      const response = await apiConnector("PUT", profilePointes.UPDATE_PROFILE,formData,{
         Authorization : `Bearer ${token}`
      })
      console.log("UPDATE_PROFILE RESPONSE" , response)
   }catch(error){
     console.log("UPDATE_PROFILE Error", error)
   }
}

export const GetAllDetailsUser = async(dispatch,token) =>
{
    try{
        const response = await apiConnector("GET", endPoints.USER_DETAILS,null, {
         Authorization :`Bearer ${token}`
        });
        console.log("user Details" , response);
         dispatch(setProfile(response.data.data));
    }catch(error)
    {
         console.log("error in Get All Details",error);
    }
}

export const ChangePassword = async(passwords,setPasswords,token) =>
{  const toastId = toast.loading("Please wait...") 
   try{
      const response = await apiConnector("POST",endPoints.CHANGE_PASSWORD,passwords,{
         Authorization:`Bearer ${token}`
      });
      if(response.statusText !== "OK")
      {
        throw new Error ;
      }
      toast.dismiss(toastId);
      toast.success("Password changed")
      console.log("change password update",response);
      setPasswords({
         oldPassword:"",
         newPassword:""
      })
   }catch(error)
   {  toast.dismiss(toastId);
      toast.error("Password change failed")
      console.log("error in change password", error);
   }
}
//added by you 
export const CheckToken = async(dispatch,navigate,token)=> {
   try{
        const response = await apiConnector("GET",endPoints.CHECK_TOKEN,null, {
          Authorization:`Bearer ${token}`
        });
        console.log("Checktoken response",response);       
   }catch(error) 
   {   
       console.log("check token error",error);
       logOut(dispatch,navigate);
   }
}

export const GetUserEnrolledCourses = async(token) =>
{   const toastId = toast.loading("Geting Enrolled courses...")
    try{
         const resposne = await apiConnector("GET", profilePointes.GET_ENROLLED_COURSES,null,{
            Authorization:`Bearer ${token}`
         });
         console.log("GetUserEnrolledCouses response",resposne)
         toast.dismiss(toastId);
        return resposne.data.data;
     }catch(error)
    {
       console.log("GetUserEnrolledCourses error" , error)
       toast.dismiss(toastId);
       toast.error(error?.response?.message)
    }
}

export const getCategoryPageDetails = async(categoryId,setCourseData,dispatch) =>
{   dispatch(setLoading(true))
   try{
       const response = await apiConnector("POST",categories.GET_COURSE_BY_CATEGORY_ID, {categoryId})
       console.log("response of Course id",response)
       setCourseData(response.data.data);
       dispatch(setLoading(false));
   }
   catch(error)
    {
       console.log("error in course category by Id", error)
    }
 }

 export const getCourseDetails = async(courseId,setCourseIdData) =>
{
   try{
       const response = await apiConnector("POST",coursePoints.GET_COURSE_DETAILS, {courseId})
       console.log("response of Course id",response)
       setCourseIdData(response.data.data);
   }
   catch(error)
    {
       console.log("error in course category by Id", error)
    }
 }


 //Razor pay functions

 function LoadScript(src) {
    return new Promise((resolve,reject) =>{
         const script = document.createElement("script");
         script.src = src;
         script.onload = () => {
             resolve(true);
         }
         script.onerror = () =>
         {
             resolve(false);
         }
         document.body.appendChild(script);
    })
 }

 // buy coures 

 export async function buyCourse(token,coursesId,userDetails,navigate,dispatch)
 { const toastId =  toast.loading("Buying course...");
    try{
        const res = await LoadScript("https://checkout.razorpay.com/v1/checkout.js");

        if(!res)
        {
           toast.error("RazorPay SDK failed to load");
           return;
        }
        //initiate order

        const orderResponse = await apiConnector("POST",razorpayPoints.CAPTURE_PAYMENT,{
         coursesId
        },{
          Authorization: `Bearer ${token}`
        });
        if(!orderResponse)
        {
           throw new Error(orderResponse.data.message);
        }
      //   console.log("order response",orderResponse)

        const options = {
            key:import.meta.env.VITE_RAZORPAY_KEY,
            currency:orderResponse.data.data.currency,
            amount:orderResponse.data.data.amount,
            order_id:orderResponse.data.data.id,
            name:"Akash StudyNotion",
            description:"Thanks you for purchasing the course",
            image:razImg, 
            prefill:{
                name:userDetails.firstName,
                email:userDetails.email
            },
            handler:function(response) 
            {   console.log("inside handler of payment ", response);
                sendPaymentSuccessEmail(response,orderResponse.data.data.amount/100,token);

                verifyPayment({...response,coursesId},token,navigate,dispatch)
            }
        }
        // open payment modal window
        const payment = new window.Razorpay(options);
        payment.open();
        payment.on("payment.failed" , function(response) {
        toast.error("oops , payment failed");
        console.log("payment error",response.error)
      })

        toast.dismiss(toastId);

    }catch(error)
      {  toast.dismiss(toastId);
         console.log("Payment api Error ...",error);
         toast.error(error.response.data.message);
    }
 }

 // send payment successfull email function

 async function sendPaymentSuccessEmail(response,amount,token)
 {
    try{
      await apiConnector("POST",razorpayPoints.SEND_SUCCESSFUL_PAYMENT_EMAIL,{
         orderId:response.razorpay_order_id,
         amount,
         paymentId:response.razorpay_payment_id
      },{
         Authorization:`Bearer ${token}`
      })
    }catch(error)
      {
        console.log("Payment succes email error", error);
    }
 }

async function verifyPayment(bodyData,token,navigate,dispatch)
   {  
      dispatch(setLoading(true))
      const toastId = toast.loading("Verifying payment ...");
   dispatch(setPaymentLoading(true))
       try{
         const response =  await apiConnector("POST",razorpayPoints.VERIFY_SIGNATURE,bodyData,{
            Authorization:`Bearer ${token}`
         })
         if(!response.data.success)
           {
             throw new Error(response.data.success);
         }
         toast.success("Payment successful, your are added to the course")
         navigate("/dashboard/enrolled-courses");
         dispatch(setLoading(false));
         dispatch(ResetCart());
     }catch(error)
       {
         console.log("payment verify error ...",error)
         toast.error("could not verify payment");
     }
     toast.dismiss(toastId)
     dispatch(setPaymentLoading(false));
}