import React,{useState} from "react";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { Link } from "react-router-dom";
import { endPoints } from "../../axios/services/apis";
import { apiConnector } from "../../axios/instance";
import { ToastContainer, toast } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css'

export default function ResetPasswordToken()
{   const [email,setEmail] = useState("");
    const [sendmail, setSendMail] = useState(false);
         
     async function handleResetPass(e)
        {    e.preventDefault();
             const toastId = toast.loading("Please wait...")
             try{
                const response = await apiConnector("POST",endPoints.RESET_PASSWORD_TOKEN,{email})
                console.log(response.data);
                toast.dismiss(toastId);
                toast.success("Mail has sent your Email");
                setSendMail(true);
             }catch(error)
             {  
               toast.dismiss(toastId);
                toast.error(error.response.data.message);
                console.log(error);
             }
        }
     return (<div className="bg-richblack-900">
         
          <div className="flex items-center justify-center h-screen max-w-maxContent mx-auto">
            { sendmail ? (<div className='flex flex-col gap-3 max-w-sm'>
              <h1 className="font-bold text-3xl text-richblack-5">Check email</h1>
              <p className="text-richblack-300" >We have sent the reset email to
{" " + email}</p>
              <button className="bg-yellow-100 w-full rounded-md p-2 " onClick={async() =>
              {
               const toastId = toast.loading("Please wait...")
             try{
                const response = await apiConnector("POST",endPoints.RESET_PASSWORD_TOKEN,{email})
                console.log(response.data);
                toast.dismiss(toastId);
                toast.success("Again Mail has sent your Email");
             }catch(error)
             {  
               toast.dismiss(toastId);
                toast.error(error.response.data.message);
                console.log(error);
             }
              }}>
              Resend email
              </button> 
              <Link className="flex items-center w-fit gap-1 text-richblack-5" to="/login">
                       <AiOutlineArrowLeft/> Back to login
                 </Link>
          </div>) :  <div className="flex flex-col gap-5 justify-between w-1/3">
                 <h1 className="font-bold text-3xl text-richblack-5">Reset your password</h1>
                 <p className="text-richblack-300">Have no fear. We’ll email you instructions to reset your password. If you dont have access to your email we can try account recovery</p>

                 <form onSubmit={handleResetPass} >
                   <div className="flex flex-col gap-2">
                   <label htmlFor="email" className="text-sm text-richblack-5">Email Address <sup className="text-[#f00]">*</sup></label>
                <input type="email" name="email" id="email" value={email} className="p-3 rounded-lg bg-richblack-800 text-richblack-200 focus:outline-none shadow-[-1px_-1px_inset_rgba(255,255,255,0.15)]" placeholder="Enter email address" onChange={(e) => {
                    setEmail(e.target.value)   
                }
                } />
                   </div>
                 <button type='submit' className="bg-yellow-100 w-full rounded-md p-2 mt-4">Reset Password</button>

                 </form>
                 <Link className="flex gap-1 w-fit items-center text-richblack-5" to="/login">
                       <AiOutlineArrowLeft/> Back to login
                 </Link>
            </div> }
           
          </div>
        <ToastContainer/>

     </div>)
}