import React, { useEffect, useState } from 'react'
import ContentSideBar from './ContentSideBar'
import VideoCompnent from './VideoCompnent'
import ReviewModal from './ReviewModal'
import { getCourseDetails } from '../../../Functions/Userfun'
import { useParams } from 'react-router-dom'
import {useDispatch,useSelector} from "react-redux";
import { setAccessCourseData, setCurrentVideo } from '../../../Redux/Slices/accessCourse'

const Index = () => {
  const [reviewModal, setReviewModal] = useState(false);
  const { courseContent } = useSelector(state => state.accessCourse);
  const dispatch = useDispatch()
  const {courseId} = useParams();
  useEffect(() =>
  {
     (async function() {
         const data = await getCourseDetails(courseId);
         dispatch(setAccessCourseData(data?.courseContent));
          dispatch(setCurrentVideo(data?.courseContent[0].subSection[0].videoUrl))
       })();
  },[courseId])
  return ( 
    <div className=''>
      <div className='grid grid-cols-[.2fr_1fr] h-screen'>
        <ContentSideBar
         setReviewModal={setReviewModal} />
        <VideoCompnent /> 
       </div> 
        {reviewModal && <div className='fixed left-0 right-0 bottom-0 top-0'>
              <ReviewModal />
         </div>}
    </div>
  )
}
export default Index;