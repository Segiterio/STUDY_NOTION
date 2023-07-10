import React, { useState } from 'react'
import SideBar from './SideBar'
import { Outlet, useNavigate } from 'react-router-dom'
import { logOut } from '../../Functions/Userfun'
import ConfirnmationModal from './ConfirnmationModal'
import { useDispatch } from 'react-redux'


const Dashboard = () => {
  const dispatch= useDispatch();
  const navigate = useNavigate();
  const [logModal, setLogModal] = useState(false);

  return (
    <div className='flex min-h-screen'>
      <div className='pt-10 bg-richblack-800 min-w-[200px] fixed h-screen'>
        <SideBar setLogModal={setLogModal} />
      </div>
      <div className='text-richblack-900 font-bold border border-pink-100 bg-richblack-900 pt-10 flex w-full'>
        <div className='max-w-[900px] mx-auto w-11/12'>
          <Outlet/>
        </div>
      </div>

      {logModal && <ConfirnmationModal setModal={setLogModal} text1={"Are you sure ?"}  text2={" You will be logged out of your Account."} onclick={() => logOut(dispatch,navigate)} btn={"Logout"}/>}
    </div>
  )
}
export default Dashboard