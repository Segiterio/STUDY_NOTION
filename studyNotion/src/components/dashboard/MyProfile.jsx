import React from 'react'
import { useSelector } from 'react-redux'
import EditBtn from './EditBtn'
import { useNavigate } from 'react-router-dom'
const MyProfile = () => {
  const user = useSelector(state => state.profile)
  const navigate = useNavigate();
  return (
    <div className='max-w-[1000px] mx-auto' >
      <h1 className='font-bold text-2xl text-white'>My Profile</h1>
      <div className='flex mt-5 flex-col gap-10'>
        <div className='flex justify-between items-center gap-2 bg-richblack-800 p-5 rounded-lg border border-richblack-700'>
          {/* profile image */}
          <div><img src={user?.image} alt={user?.firstName} className='w-16 h-16 object-cover rounded-full' loading='lazy'/>
          </div>
          <div className='flex-grow '>
            <h2 className='text-lg text-richblack-5 font-semibold'>{user?.additionalDetails?.displayName || user?.firstName + " " + user?.lastName}</h2>
            <p className='text-richblack-300 text-sm font-normal'> {user?.email}</p>
          </div>
          {/* Edit button */}
         <EditBtn navigate={navigate}/>
        </div>
        
        <div className='flex flex-col justify-between items-center gap-2 bg-richblack-800 p-5 rounded-lg border border-richblack-700'>
        <div className='flex justify-between w-full'>
            <h2 className='text-lg font-semibold text-richblack-5'>About</h2>
            <EditBtn navigate={navigate} />
          </div>
           
           {user?.additionalDetails?.about ? <div className='self-start text-richblack-25 font-normal'>{user?.additionalDetails?.about}</div> : <div className='self-start font-normal text-richblack-600'>Write something about your self</div> }
          </div>

        <div className='flex justify-between gap-2 bg-richblack-800 p-5 rounded-lg flex-col border border-richblack-700 '>
          <div className='flex justify-between'>
            <h2 className='text-lg font-semibold text-richblack-5'>Personal Details</h2>
            <EditBtn navigate={navigate} />
          </div>
           

          <div className='grid grid-cols-2 grid-rows-3 gap-5 w-max'>

            <div >
              <h3 className='text-richblack-600 text-sm font-normal'>First Name</h3>
              <p className='text-richblack-5 font-normal'>{user?.firstName}</p>
            </div>
            <div>
              <h3 className='text-richblack-600 text-sm font-normal'>Last Name</h3>
              <p className='text-richblack-5 font-normal'>{user?.lastName}</p>
            </div>
            <div>
              <h3 className='text-richblack-600 text-sm font-normal'>Email</h3>
              <p className='font-normal text-richblack-5'>{user?.email}</p>
            </div>
            <div>
              <h3 className='text-richblack-600 text-sm font-normal' >Phone Number</h3>
              <p className='text-richblack-5 font-normal'>{user?.additionalDetails?.contactNumber ? user?.additionalDetails?.contactNumber : "Add Contact"}</p>
            </div>
            <div>
              <h3 className='text-richblack-600 text-sm font-normal' >Gender</h3>
              <p className='text-richblack-5 font-normal'>{user?.additionalDetails?.gender ? user?.additionalDetails?.gender : "Add Gender" }</p>
            </div>
            <div>
              <h3 className='text-richblack-600 text-sm font-normal' >Date of Birth</h3>
              <p className='text-richblack-5 font-normal'>{user?.additionalDetails?.dateOfBirth ? user?.additionalDetails?.dateOfBirth : "Add Date of Birth"}</p>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

export default MyProfile