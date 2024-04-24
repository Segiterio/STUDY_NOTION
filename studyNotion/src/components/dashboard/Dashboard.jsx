import React, { useState } from 'react'
import SideBar from './SideBar'
import { Outlet, useNavigate } from 'react-router-dom'
import { logOut } from '../../Functions/Userfun'
import ConfirnmationModal from './ConfirnmationModal'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../cors/Loader'


const Dashboard = () => {
  const {loading} = useSelector(state => state.auth);
  const dispatch= useDispatch();
  const navigate = useNavigate();
  const [logModal, setLogModal] = useState(false);

  return (
    <div className='flex min-h-screen'>
    { loading ? <Loader/> : <><div className='pt-10 bg-richblack-800 lg:fixed h-screen'>
        <SideBar setLogModal={setLogModal} />
      </div>
      <div className='text-richblack-900 font-bold bg-richblack-900 pt-10 flex w-full'>
        <div className='outlet'>
          <Outlet/>
        </div>
      </div></> }

      {logModal && <ConfirnmationModal setModal={setLogModal} text1={"Are you sure ?"}  text2={" You will be logged out of your Account."} onclick={() => logOut(dispatch,navigate)} btn={"Logout"}/>}
    </div>
  )
}
export default Dashboard