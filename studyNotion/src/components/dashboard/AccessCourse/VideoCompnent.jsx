import React from 'react'
import { useSelector } from 'react-redux'

const VideoCompnent = () => {
  const {videoUrl} = useSelector(state => state.accessCourse)
  return (
    <div className='flex justify-center items-center pt-4 overflow-hidden'>
    { videoUrl && <video controls src={videoUrl} className=''></video>    }
    </div>
  )
}
export default VideoCompnent