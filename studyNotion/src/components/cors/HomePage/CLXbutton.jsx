import React from 'react'
import { Link } from 'react-router-dom'

const CLXbutton = ({active,go,children}) => {
  return (
    <div className ={`${active ? "bg-yellow-50 shadow-yellow-5 text-richblack-900":"bg-richblack-800"} px-6 py-3 rounded-lg shadow-[-1px_-1px_inset_rgba(255,255,250,0.15)] font-medium w-fit text-xs md:text-base`}>
       <Link to={go}>
          <p className='flex items-center gap-2'>{children}</p>
         </Link>
    </div>
  )
}
export default CLXbutton;