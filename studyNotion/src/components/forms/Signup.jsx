import React, { useState } from 'react'
import Codes from "../../data/countrycode.json"
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai"
import { useDispatch } from "react-redux"
import { setUserDetails, setLoading } from '../../Redux/Slices/auth'
import { endPoints } from '../../axios/services/apis';
import { useNavigate } from "react-router-dom";
import { apiConnector } from '../../axios/instance'
import { toast } from "react-toastify"
const Signup = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [passEye, setPassEye] = useState(true);
    const [eye, setEye] = useState(true);
    const [accountType, setAccountType] = useState("Student");
    const [formdata, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        contactNumber: "",
        password: "",
        confirmPassword: "",
        countryCode: "",
    });

    function handleOnchange(e) {

        setFormData({
            ...formdata,
            [e.target.name]: e.target.value
        })
    }
    console.log("signUp", formdata)
    async function handleSubmit(e) {
        try {
            const toastId = toast.loading("Sending OTP")
            dispatch(setLoading(true));
            e.preventDefault();
            //pushing accountType field in to form
            formdata.accountType = accountType;
            const { email } = formdata;

            // console.log("form signup data", formdata);
            //storing form data in auth slice
            dispatch(setUserDetails(formdata));
            //calling sendotp api
            const response = await apiConnector("POST", endPoints.SEND_OTP, { email });
            console.log(response);
            toast.dismiss(toastId);
            if (response.status == 200) {
                toast.success("OTP send Successfully");
                navigate("/signup/otp");
            }
            else {
                toast.error("Couldn't send otp");
                setFormData({});
                console.log("else", formdata);
            }
            dispatch(setLoading(false));
            //make a call form otp api
            console.log(formdata);
        }
        catch (error) {
            console.log("Something wend wrong in the front end of send otp api" + error);
        }
    }
    //controlled and uncontrolled input read karo
    return (
        <div >
            <div className='rounded-full w-fit flex  items-center bg-richblack-800 p-1 my-2 shadow-[-1px_-1px_inset_rgba(255,255,250,0.1)]'>
                <div className={`rounded-full px-5 py-1 cursor-pointer text-richblack-200 ${accountType == "Student" && "text-richblack-5 bg-richblack-700"}`}><div onClick={() => {
                    setAccountType("Student");
                }}>Student</div></div>
                <div className={`rounded-full px-5 py-1 cursor-pointer text-richblack-200 ${accountType != "Student" && "text-richblack-5 bg-richblack-700"}`}><div onClick={() => {
                    setAccountType("Instructor");
                }}>Instructor</div></div>
            </div>
            <form onSubmit={handleSubmit} className="flex flex-col gap-2 " autoComplete='on'>
                <div className="flex flex-col gap-2">
                    <div className='flex justify-between'>

                        {/* firstName  */}
                        <div className='flex flex-col gap-1 w-[48%]'>
                            <label htmlFor="firstName" className="text-sm text-richblack-5">First Name <sup className="text-[#f00]">*</sup></label>
                            <input type="firstName" name="firstName" id="firstName" value={formdata.firstName} onChange={handleOnchange} className="p-2 rounded-lg bg-richblack-800 text-richblack-200 focus:outline-none shadow-[-1px_-1px_inset_rgba(255,255,255,0.15)]" placeholder="First name" />
                        </div>
                        {/* lastName  */}
                        <div className='flex flex-col gap-1 w-[48%]'>
                            <label htmlFor="lastName" className="text-sm text-richblack-5">Last Name<sup className="text-[#f00]">*</sup></label>
                            <input type="lastName"
                                value={formdata.lastName} onChange={handleOnchange} name="lastName" id="lastName" className="p-2 rounded-lg bg-richblack-800 text-richblack-200 focus:outline-none shadow-[-1px_-1px_inset_rgba(255,255,255,0.15)]" placeholder="Last name" />
                        </div>
                    </div>

                    {/* email  */}
                    <div className='flex flex-col gap-1'>
                        <label htmlFor="email" className="text-sm text-richblack-5">Email Address <sup className="text-[#f00]">*</sup></label>
                        <input type="email" name="email" id="email"
                            value={formdata.email} onChange={handleOnchange}
                            className="p-2 rounded-lg bg-richblack-800 text-richblack-200 focus:outline-none shadow-[-1px_-1px_inset_rgba(255,255,255,0.15)]" placeholder="Enter email address" />
                    </div>

                </div>

                {/* phone Number  */}
                <div className='flex flex-col gap-1'>

                    <label htmlFor="countryCode" className='text-sm text-richblack-5' >Phone Number <sup className="text-[#f00]">*</sup></label>
                    <div className='flex gap-2'>
                        <select id="countryCode" name="countryCode" onChange={handleOnchange} value={formdata.countryCode} className='bg-richblack-800 rounded-md text-richblack-300 p-2 focus:outline-none shadow-[-1px_-1px_inset_rgba(255,255,250,0.1)] w-[20%]' >
                            {
                                Codes.map((code, index) => (<option value={code.code} key={index} >{code.code} </option>))
                            }
                        </select>
                        {/* <MdKeyboardArrowDown className='absolute top-1/3 right-2' /> */}
                        <input type="tel" name="contactNumber"
                            value={formdata.mobile} id="contactNumber" onChange={handleOnchange} placeholder='12345 67890' className='bg-richblack-800 rounded-md flex-grow p-2 focus:outline-none shadow-[-1px_-1px_inset_rgba(255,255,250,0.1)] w-[40%] text-richblack-200' />
                    </div>
                </div>


                <div className='flex justify-between'>
                    {/* create password  */}
                    <div className="flex flex-col gap-1 w-[48%]">
                        <label htmlFor="password" className="text-sm text-richblack-5">Create Password <sup className="text-[#f00]">*</sup></label>
                        <div className="relative">
                            <input type={eye ? "password" : "text"} name="password"
                                value={formdata.password} onChange={handleOnchange} id="password" className="p-2 rounded-lg bg-richblack-800 text-richblack-200 focus:outline-none shadow-[-1px_-1px_inset_rgba(255,255,255,0.15)] w-full" placeholder="Enter password" />
                            <div className="absolute right-3 top-1/3">
                                {eye ? <AiFillEye className="text-richblack-300 text-xl" onClick={() => {
                                    setEye(false)
                                }} /> : <AiFillEyeInvisible className="text-richblack-300 text-xl" onClick={() => {
                                    setEye(true);
                                }} />}
                            </div>
                        </div>
                    </div>

                    {/* confirm password  */}
                    <div className="flex flex-col gap-1 w-[48%]">
                        <label htmlFor="confirmPassword" className="text-sm text-richblack-5">Confirm Password <sup className="text-[#f00]">*</sup></label>
                        <div className="relative">
                            <input type={passEye ? "password" : "text"} name="confirmPassword"
                                value={formdata.confirmPassword} onChange={handleOnchange} id="confirmPassword" className="p-2 rounded-lg bg-richblack-800 text-richblack-200 focus:outline-none shadow-[-1px_-1px_inset_rgba(255,255,255,0.15)] w-full" placeholder="Enter password" />
                            <div className="absolute right-3 top-1/3">
                                {passEye ? <AiFillEye className="text-richblack-300 text-xl" onClick={() => {
                                    setPassEye(false)
                                }} /> : <AiFillEyeInvisible className="text-richblack-300 text-xl" onClick={() => {
                                    setPassEye(true);
                                }} />}
                            </div>
                        </div>
                    </div>
                </div>
                <button className="bg-yellow-100 w-full p-2 rounded-lg font-semibold mt-2" >Sign In</button>
            </form>

        </div>
    )
}
export default Signup;