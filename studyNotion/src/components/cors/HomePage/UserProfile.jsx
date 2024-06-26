import React, {useRef, useState,useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RiShoppingCartLine } from 'react-icons/ri'
import { AiFillCaretDown } from "react-icons/ai"
import { logOut } from '../../../Functions/Userfun'
import { useNavigate } from 'react-router-dom'
import { VscSignOut } from 'react-icons/vsc'


export const UserProfile = ({Link}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showDropDown, setShowDropDown] = useState(false)
  const user = useSelector(state => state.profile);
  console.log("user details in userProfile", user);

  const dropDown = useRef();
// if clickout side close userProfileDropDown
  useEffect(() => {
    const isClickedOutside = e => {
       if(showDropDown && dropDown.current && !dropDown.current.contains(e.target))
       {setShowDropDown(false)}
    }
     console.log("triggred")
     document.addEventListener("mousedown",isClickedOutside)

  return () => {
      document.removeEventListener("mousedown",isClickedOutside)
     }
  },[showDropDown])

  return (
    <div className='flex gap-2 items-center text-white' ref={dropDown} >
      {user?.accountType == "Student" && <Link to="/dashboard/cart" ><RiShoppingCartLine /></Link>}
      <img src={user?.image} alt={user?.firstName} className='w-5 h-5 rounded-full object-cover' loading='lazy' />
      <div className='relative'>
        <AiFillCaretDown  onClick={() => {
          setShowDropDown(!showDropDown);
        }} className='relative' />

        {showDropDown && <div className='absolute border border-richblack-400 rounded-lg bg-richblack-700'>
          {/* add with icons */}
          <div className='cursor-pointer p-1 hover:bg-richblack-800 rounded-tr-lg rounded-tl-lg' onClick={() =>
          { setShowDropDown(false)  
             navigate("/dashboard/my-profile")
            //  setShowDropDown(false);
          }} >Dashboard</div>
          <div className='h-[2px] bg-richblack-500'></div>
          <div onClick={() =>
           {setShowDropDown(false)  
            logOut(dispatch,navigate)}} className='cursor-pointer p-1 hover:bg-richblack-800 rounded-br-lg rounded-bl-lg flex items-center gap-1'><VscSignOut/> Log out</div>
        </div>}

      </div>
    </div>
  )
}
