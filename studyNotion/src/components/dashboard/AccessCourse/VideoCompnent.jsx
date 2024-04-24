import React from 'react'
import ReactPlayer from 'react-player'
import { useSelector } from 'react-redux'

const VideoCompnent = () => {
  const {videoUrl} = useSelector(state => state.accessCourse)
  const { courseContent } = useSelector(state => state.accessCourse);
  console.log("obje",courseContent)
  return (
    <div className='place-self-start '>
      <ReactPlayer url={videoUrl} controls width='100%'
      height='100%' />
      <div className='text-white pt-5 px-4'>{courseContent[0]?.subSection[0]?.description}</div>
      </div>
  )
} 
export default VideoCompnent