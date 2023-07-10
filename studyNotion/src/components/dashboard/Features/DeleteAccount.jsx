import React from 'react'
import {ImBin} from "react-icons/im"
const DeleteAccount = () => {
  return (
    <div className='flex bg-pink-900 border-pink-700 border rounded-lg p-3 gap-2 '>
     
       {/* icon delete */}
       <div className=' self-start p-3 rounded-full bg-pink-700'>
       <ImBin className='text-2xl text-pink-200'/>
       </div>
       <div className='flex flex-col gap-2'>
          <h2 className='text-richblack-5'>Delete Account</h2>
          <div>
          <p className='text-pink-25'>Would you like to delete account?</p>
          <p className='text-pink-25'>This account contains Paid Courses. Deleting your account will remove all the contain associated with it.</p>
          </div>
          <div className='text-pink-300 font-thin italic cursor-pointer hover:underline'>I want to delete my account.</div>
       </div>
    
    </div>
  )
}

export default DeleteAccount