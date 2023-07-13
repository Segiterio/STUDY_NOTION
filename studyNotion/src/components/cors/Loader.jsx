import React from 'react'

const Loader = () => {
  return (
    <div className='bg-richblack-900'>
    <div className='h-screen flex justify-center items-center w-screen'>
        <div className="lds-ring"><div></div><div></div><div></div><div></div></div>
    </div>
    </div>
  )
}

export default Loader