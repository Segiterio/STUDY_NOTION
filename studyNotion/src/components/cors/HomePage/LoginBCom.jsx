import React from 'react'
import { Link } from 'react-router-dom'
//login button component
export const LoginBCom = ({children , link}) => {
  return (
     <button className='border rounded-md border-richblack-700 text-richblack-100 p-1 mr-2 md:text-base text-sm'><Link to={link}>{
        children
     }</Link>
     </button>
  )
}
