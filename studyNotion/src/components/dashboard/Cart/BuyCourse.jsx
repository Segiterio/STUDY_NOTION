import React from 'react'

const BuyCourse = ({total}) => {
  return (
    <div className='bg-richblack-800 border border-richblack-700 p-6 flex flex-col gap-2 rounded-md sticky top-14'>
        <p>Total:</p>
        <div>
           <p className='text-2xl text-yellow-50'>Rs. {total}</p> 
           <p className='text-richblack-300'>previous price</p>
        </div>

        <button className='px-6 py-3 bg-yellow-50 shadow-inner-[-2px_-2px_rgba(255,255, 255, 0.51)] text-richblack-900 rounded-md'>
            Buy Now
        </button>

    </div>
  )
}

export default BuyCourse