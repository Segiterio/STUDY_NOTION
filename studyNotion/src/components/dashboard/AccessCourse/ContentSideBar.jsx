import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AiFillCaretDown, AiFillCaretUp } from "react-icons/ai"
import { setCurrentVideo } from '../../../Redux/Slices/accessCourse';

const ContentSideBar = () => {
  const { courseContent } = useSelector(state => state.accessCourse);
  const dispatch = useDispatch();
  const [openSection, setOpenSection] = useState([]);
  return (
    <div className='bg-richblack-800 text-richblack-200 pt-8 overflow-y-auto min-w-fit '>
      {
        courseContent.map((section) => {
          return (<div key={section._id} className=''>
            <div className='flex items-center justify-between bg-richblack-600 p-2'>
              <div>{section.sectionName}</div>
              <div className='cursor-pointer' onClick={() => {
                !openSection.includes(section._id) ? setOpenSection([...openSection, section._id]) : setOpenSection(openSection.filter(id => {
                  id != section._id;
                    }
                  )
                )
              }}>
                {openSection.includes(section._id) ? <AiFillCaretDown /> : <AiFillCaretUp />}
              </div>
            </div>
            {
              openSection.includes(section._id) && section.subSection.map((subSection) =>
              (<div className='transition-all duration-500  cursor-pointer px-4 py-2' key={subSection._id}>
                <div>
                  <form className='flex gap-2'>
                    <input type="checkbox" name="" id="" />
                    <div className='text-sm' onClick={() => {
                        dispatch(setCurrentVideo(subSection.videoUrl));
                    }}>{subSection.title}</div>
                  </form>
                </div>
              </div>))
            }
          </div>)
        })
      }
    </div>
  )
}

export default ContentSideBar