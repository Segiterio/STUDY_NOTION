import React from 'react'
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai"
import { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { endPoints } from '../../axios/services/apis';
import { toast } from 'react-toastify';
import { apiConnector } from '../../axios/instance';
import { useDispatch } from 'react-redux';
import { setauth } from '../../Redux/Slices/auth';
import { setProfile } from '../../Redux/Slices/user';

const Login = () => {
    const [eye, setEye] = useState(true);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    async function handleLogin(e) {
        const toastId = toast.loading("Please Wait");
        try {
             e.preventDefault();
            //call the api 
            const response = await apiConnector("POST", endPoints.USER_LOGIN, { email, password });
            toast.dismiss(toastId);
            //store token into local storage later
            console.log("login response" , response)
            dispatch(setauth(response.data.token));
            dispatch(setProfile(response.data.user))
            toast.success(response.data.message);
            navigate("/dashboard/my-profile");

        } catch (error) {
            toast.dismiss(toastId);
            console.log("error in login handleLogin ", error)
            toast.error(error.response.data.message);
        }
    }
    return (
        <form className="flex flex-col gap-5" onSubmit={handleLogin}>
            <div className="flex flex-col gap-1">
                <label htmlFor="email" className="text-xs lg:text-sm text-richblack-5">Email Address <sup className="text-[#f00]">*</sup></label>
                <input type="email" name="email" id="email" value={email} className="p-3 rounded-lg bg-richblack-800 text-richblack-200 focus:outline-none shadow-[-1px_-1px_inset_rgba(255,255,255,0.15)] text-xs lg:text-sm " placeholder="Enter email address" onChange={(e) => {
                    setEmail(e.target.value)   
                }
                } />
            </div>

            <div className="flex flex-col gap-1">
                <label htmlFor="password" className="text-xs lg:text-sm  text-richblack-5">Password <sup className="text-[#f00]">*</sup></label>
                <div className="relative">
                    <input type={eye ? "password" : "text"} name="password" id="password" value={password} className="p-3 rounded-lg bg-richblack-800 text-richblack-200 focus:outline-none shadow-[-1px_-1px_inset_rgba(255,255,255,0.15)] w-full text-xs lg:text-sm " placeholder="Enter password" onChange={(e) => {
                        setPassword(e.target.value)
                    }
                    } />
               {   password.length > 0 &&  <div className="absolute right-3 top-1/3">
                        {eye ? <AiFillEye className="text-richblack-300 text-xl" onClick={() => {
                            setEye(false)
                        }} /> : <AiFillEyeInvisible className="text-richblack-300 text-xl" onClick={() => {
                            setEye(true);
                        }} />}
                    </div>
               } 
               </div>
                <Link className="text-blue-100 self-end" to="/login/Reset-Password-Token">
                    Forget password
                </Link>
            </div>
            {/* <div className='text-white'>{email + password}</div> */}
            <button className="bg-yellow-100 w-full p-3 rounded-lg font-semibold disabled:bg-yellow-600" type="submit">Log In</button>
        </form>
    )
}
export default Login;