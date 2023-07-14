import React, { useEffect, useState } from 'react'
import ContentSideBar from './ContentSideBar'
import VideoCompnent from './VideoCompnent'
import ReviewModal from './ReviewModal'
import {useSelector } from 'react-redux'

const Index = () => {
  const [reviewModal, setReviewModal] = useState(false);
  const { loading } = useSelector(state => state.auth);

  
  return (
    <div>
      <div>
        <ContentSideBar
         setReviewModal={setReviewModal} />
        <VideoCompnent />
        {reviewModal && <ReviewModal />}
      </div>
    </div>
  )
}

export default Index;