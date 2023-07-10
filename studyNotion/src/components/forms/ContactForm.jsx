import React from 'react'
import Codes from "../../data/countrycode.json"


const ContactForm = ({register,handleSubmit}) => {

    const formData = (data) => {
        console.log(data);
      }
  return (
  
    <form autoComplete='on' className='flex flex-col gap-3 text-richblack-5' onSubmit={
      handleSubmit(formData)}
    >
      <div className='flex gap-4'>

        <div className='flex flex-col w-1/2'>
          <label htmlFor='firstName' className='text-sm'>
            First Name
          </label>
          <input id='firstName' type="text" placeholder='Enter first Name' className='bg-richblack-800 rounded-md placeholder:text-richblack-200 p-2 focus:outline-none shadow-[-1px_-1px_inset_rgba(255,255,250,0.1)]' {...register("firstName", { required: {value: true , message:"Please fill First Name"} })} />
        </div>

        <div className='flex flex-col w-1/2' >
          <label htmlFor='lastName' className='text-sm'>
            Last Name
          </label>
          <input type="text" id="lastName" placeholder='Enter last Name' className='bg-richblack-800 rounded-md placeholder:text-richblack-200 p-2 focus:outline-none shadow-[-1px_-1px_inset_rgba(255,255,250,0.1)] ' {...register("lastName", { required: "This is required" })} />
        </div>

      </div>

      <div className='flex flex-col'>
        <label htmlFor='email' className='text-sm'>Email Address</label>
        <input type="email" id="email" placeholder='Enter email address' className='bg-richblack-800 rounded-md placeholder:text-richblack-200 p-2 focus:outline-none shadow-[-1px_-1px_inset_rgba(255,255,250,0.1)]' {...register("email", { required: "This is required" })} />
      </div>

      <div>

        <label htmlFor="countryCode" className='text-sm' >Phone Number</label>
        <div className='flex gap-3'>
          <select id="countryCode" className='bg-richblack-800 rounded-md placeholder:text-richblack-200 w-1/5 p-2 focus:outline-none shadow-[-1px_-1px_inset_rgba(255,255,250,0.1)]' {...register("countryCode", { required: "This is required" })}>
            {
              Codes.map((code, index) => (<option value={code.code} key={index} >{code.code} </option>))
            }
          </select>
          {/* <MdKeyboardArrowDown className='absolute top-1/3 right-2' /> */}
          <input type="tel" id="mobile" placeholder='12345 67890' className='bg-richblack-800 rounded-md placeholder:text-richblack-200 flex-grow p-2 focus:outline-none shadow-[-1px_-1px_inset_rgba(255,255,250,0.1)]' {...register("mobile", { required: "Between 6 to 10", maxLength: 10, minLength: 6 })} />
        </div>
      </div>

      <div>
        <label htmlFor='message' className='text-sm'>Message</label>
        <textarea id="message" placeholder='Enter your message' className='bg-richblack-800 rounded-md placeholder:text-richblack-200 w-full p-2 focus:outline-none shadow-[-1px_-1px_inset_rgba(255,255,250,0.1)] ' {...register("message", { required: "This is required" })} rows={4}></textarea>
      </div>
      <button type="submit" className='w-full py-2 bg-yellow-50 rounded-md text-richblack-900 font-semibold'>
        Send Message
      </button>
    </form>
  
  )
}

export default ContactForm