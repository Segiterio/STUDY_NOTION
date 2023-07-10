import React from 'react'

const ConfirnmationModal = ({ setModal,text1,text2,onclick,btn}) => {

  return (
    <div className='fixed top-0 right-0 left-0 bottom-0 z-10 backdrop-blur-sm' onClick={() => {
      setModal(false);
    }}>
      <div className='p-5 bg-richblack-700 flex flex-col gap-4 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-md border border-richblack-300'>
        <h1 className='font-semibold text-3xl text-richblack-5'>{text1}</h1>
        <p className='text-lg text-pink-300'>{text2}</p>
        <div>
          <button className='px-3 py-2 rounded-md bg-yellow-100 mr-3' onClick={() => onclick()}>{btn}</button>
          <button className='px-3 py-2 rounded-md bg-richblack-400' onClick={() => {
            setModal(false);
          }}>Cancel</button>
        </div>
      </div>
    </div>
  )
}
export default ConfirnmationModal