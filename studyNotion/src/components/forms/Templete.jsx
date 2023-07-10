import React from 'react'
import Login from './Login';
import Signup from "./Signup"
import Frame from "../../assets/Images/frame.png"
import {useSelector} from "react-redux"

const Templete = ({heading,description,subdescription,formType,image}) => {
   const {loading} = useSelector(state => state.auth)
  return (
     loading ? 
     <div className='max-w-maxContent mx-auto'>
       <div className='h-screen flex items-center justify-center flex-col'>
     <div className="lds-ring"><div></div><div></div><div></div><div></div></div><div>Loading...</div></div></div> :
    <div className="bg-richblack-900 h-screen flex items-center">
        <div className="max-w-maxContent mx-auto grid grid-cols-2 w-11/12 ">
        <div className="flex flex-col gap-2 max-w-md">
      <h2 className="text-richblack-5 text-4xl font-semibold">{heading}</h2>
        <p className="text-richblack-100 text-lg">{description}<span className="text-blue-100 font-edusa italic">{subdescription}</span></p>
        {  formType == "Login" ? <Login /> : <Signup/>}
    </div>
       
            <div className="relative border place-self-center max-w-sm">
                <img src={Frame} alt="Frame" className="absolute top-3 left-3" />
                <img className="relative" src={image} alt={`${image}`} />
            </div>
        </div>
    </div>
  )
}
export default Templete;