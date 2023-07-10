import React, { useState } from 'react'
import OtpInput from "react-otp-input"
import { useNavigate, Link } from 'react-router-dom'
import { BsArrowLeftShort } from 'react-icons/bs';
import { GiAnticlockwiseRotation } from "react-icons/gi"
import { useSelector } from 'react-redux';
import { apiConnector } from '../../axios/instance';
import { endPoints } from '../../axios/services/apis';
import { toast } from 'react-toastify';

const Otpage = () => {
    const [otp, setOtp] = useState("");
    const navigate = useNavigate();
    const { userDetails } = useSelector(state => state.auth);

    //make seperate folder for all user api call and provide better name
    async function handleOnSubmit() {
        const toastId = toast.loading("Signing Up...");
        try {
            const { firstName, lastName, email, contactNumber, password, confirmPassword, accountType } = userDetails;
            //call the api
            const response = await apiConnector("POST", endPoints.USER_SIGNUP, { firstName, lastName, email, contactNumber, password, confirmPassword, accountType, otp });
            toast.dismiss(toastId);
            // this condition only for 404 not found i think because 404 error found in fetch api
            if (response.status == 200) {
                toast.success(response.data.message)
                navigate("/login");
            }
            else {
                toast.error(response.response.message);
            }
            //printing response
            console.log("response", response)
        }
        catch (error) {
            toast.dismiss(toastId);
            toast.error(error.response.data.message);
            //clear form data;
        }
    }
    async function resendOtp()
    {
        const toastId = toast.loading("Signing Up...");
         try{
            const {email} = userDetails
            const response = await apiConnector("POST", endPoints.SEND_OTP,{email});
            toast.dismiss(toastId);
            toast.success(response.data.message);
         }
         catch(error)
         {
            toast.dismiss(toastId);
            console.log(error);
            toast.error(error.response.data.message);
         }
    }
    return (
        <div className='bg-richblack-900'>
            <div className='h-screen max-w-maxContent mx-auto grid place-content-center'>

                <div className='grid gap-5'>
                    <h1 className='font-semibold text-4xl text-richblack-5'>Verify email</h1>
                    <p className='text-richblack-200'>A verifcation code has sent to you. Enter the code below</p>
                    <OtpInput value={otp} onChange={setOtp}
                        numInputs={6}
                        renderInput={(props) => <input {...props} />}
                        containerStyle={"flex justify-around"}
                        inputStyle={"shadow-[-1px_-1px_inset_rgba(255,255,250,.1)] rounded-md bg-richblack-800 text-white text-4xl font-thin "}
                        placeholder={"------"}
                    />
                    <button className='bg-yellow-50 rounded-md py-2 font-semibold hover:bg-yellow-100 active:scale-95 duration-200 ' onClick={handleOnSubmit}  >Verify email</button>
                    <div className='flex justify-between '>

                        <Link to="/login" className="flex items-center text-richblack-100">
                            <BsArrowLeftShort />
                            Back to login
                        </Link>

                        <div className='flex items-center text-blue-200 cursor-pointer gap-2' onClick={resendOtp} >
                            <GiAnticlockwiseRotation />
                            Resend it
                        </div>

                    </div>

                </div>
            </div>
        </div>
    )
}
export default Otpage
