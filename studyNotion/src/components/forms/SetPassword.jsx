import React, { useState } from 'react'
import { AiFillEye, AiOutlineArrowLeft, AiFillEyeInvisible } from 'react-icons/ai';
import { Link, useLocation, useParams} from 'react-router-dom';
import { endPoints } from '../../axios/services/apis';
import { apiConnector } from '../../axios/instance';
import { toast } from 'react-toastify';

const SetPassword = () => {
  const [password, setPass] = useState("");
  const [confirmPassword, setCPass] = useState("");
  const [eye, setEye] = useState(true);
  const [ceye, setCEye] = useState(true);
  const location = useLocation();
  
  const [email, setemail] = useState("");

  async function handleResetPasswordSubmit(e) {
    e.preventDefault();
    const toastId = toast.loading("Please wait...");
    try {
      const {tokenEmail} = useParams();
      const response = await apiConnector("POST", endPoints.FORGET_PASSWORD, {password, confirmPassword, token:tokenEmail });
      console.log(response);
      toast.dismiss(toastId);
      toast.success("Password reset successfull");
      //make value of email true
      setemail(response.data.data);
    } catch (error) {
      toast.dismiss(toastId);
      toast.error(error.response.data.message)
      console.log("Error in seting forget password", error)
    }
  }

  function emailStar(mail) 
  {  
     const indexOfAtTheRate = mail.indexOf("@");
    let str = "";
   const newSubStr = mail.substring(1,indexOfAtTheRate);
   const newlength = newSubStr.length;
   for(let x=0 ; x<newlength ; x++) 
   {
       str = str + "*";
   }
  return mail.replace(newSubStr, str)
  }
  return (
    <div className='
    bg-richblack-900 '>
      <div className='flex justify-center items-center max-w-maxContent mx-auto h-screen'>
        {email ? (<div className='flex flex-col gap-3 max-w-sm'>
              <h1 className="font-bold text-3xl text-richblack-5">Reset complete!</h1>
              <p className="text-richblack-300" >All done! We have sent an email to {" " + emailStar(email)} confirm</p>
              <Link className="bg-yellow-100 w-full rounded-md p-2 text-center" to="/login">
              Return to login
              </Link>
          </div>) :  (<div className='flex flex-col gap-3'>
          <h1 className="font-bold text-3xl text-richblack-5" >Choose new password</h1>
          <p className="text-richblack-300">Almost done. Enter your new password and youre all set.</p>
          <form className='flex flex-col gap-5' onSubmit={handleResetPasswordSubmit}>
            <div>
              <label htmlFor="password" className="text-sm text-richblack-5">Enter New Password <sup className="text-[#f00]">*</sup></label>
              <div className="relative">
                <input type={eye ? "password" : "text"} name="password"
                  value={password} onChange={(e) => {
                    setPass(e.target.value)
                  }} id="password" className="p-2 rounded-lg bg-richblack-800 text-richblack-200 focus:outline-none shadow-[-1px_-1px_inset_rgba(255,255,255,0.15)] w-full" placeholder="Enter password" />
                {password.length > 0 && (<div className="absolute right-3 top-1/3">
                  {eye ? <AiFillEye className="text-richblack-300 text-xl" onClick={() => {
                    setEye(false)
                  }} /> : <AiFillEyeInvisible className="text-richblack-300 text-xl" onClick={() => {
                    setEye(true);
                  }} />}
                </div>)}

              </div>

            </div>
            <div>
              <label htmlFor="confirmPassword" className="text-sm text-richblack-5">Confirm Password <sup className="text-[#f00]">*</sup></label>
              <div className="relative">
                <input type={ceye ? "password" : "text"} name="confirmPassword"
                  value={confirmPassword} onChange={(e) => {
                    setCPass(e.target.value)
                  }} id="confirmPassword" className="p-2 rounded-lg bg-richblack-800 text-richblack-200 focus:outline-none shadow-[-1px_-1px_inset_rgba(255,255,255,0.15)] w-full" placeholder="Enter password" />
                {confirmPassword.length > 0 && (<div className="absolute right-3 top-1/3">
                  {ceye ? <AiFillEye className="text-richblack-300 text-xl" onClick={() => {
                    setCEye(false)
                  }} /> : <AiFillEyeInvisible className="text-richblack-300 text-xl" onClick={() => {
                    setCEye(true);
                  }} />}
                </div>)
                }
              </div>

            </div>
            <button type='submit' className="bg-yellow-100 w-full rounded-md p-2 ">Reset Password</button>
          </form>
          <Link className="flex gap-1 items-center w-fit  text-richblack-5" to="/login">
            <AiOutlineArrowLeft /> Back to login
          </Link>  </div>) }
      </div>

    </div>
  )
}
export default SetPassword;