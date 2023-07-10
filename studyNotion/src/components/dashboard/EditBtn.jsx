import React from 'react'
import { VscEdit } from 'react-icons/vsc'
const EditBtn = ({navigate}) => {
  return (
    <div className='bg-yellow-50 flex items-center text-black px-3 py-1 gap-2 rounded-md cursor-pointer active:scale-95' onClick={() => {
        navigate("/dashboard/setting");
     } } >
     <VscEdit />
    Edit
    {/* try Navigate component in place of navigate hook */}
  </div>
  )
}
export default EditBtn