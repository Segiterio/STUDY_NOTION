import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { GetUserEnrolledCourses } from '../../Functions/Userfun';
import ProgressBar from "@ramonak/react-progress-bar"
import {BsThreeDotsVertical} from "react-icons/bs"
import { Link } from 'react-router-dom';

const EnrolledCourses = () => {
  const { token } = useSelector(state => state.auth)

  const [enrolledCourses, setEnrolledCourses] = useState(null);

  const getEnrolledCourses = async () => {
    const result = await GetUserEnrolledCourses(token);
    setEnrolledCourses(result);
    console.log("result",result)
  }

  useEffect(() => {
    getEnrolledCourses()
  }, [])

  return (
    <div className='text-white flex flex-col'>
      <h1 className='text-2xl'>Enrolled Courses</h1>
       {
         !enrolledCourses ? <div className='my-auto self-center text-4xl font-normal text-richblack-600'>Loading...{console.log("loading")}</div> 
         : (!enrolledCourses.length > 0 ? (<p className='my-auto self-center text-4xl font-normal text-richblack-600'>You are not enrolled in any course yet</p>) : (<div className='rounded-md overflow-clip border-richblack-500 border font-normal '>
                        <div>
             <div className='bg-richblack-700 grid grid-cols-[.6fr_.2fr_.2fr] text-sm gap-4 py-2 px-1'>
                <h2>Course Name</h2>
                <h2>Duration</h2>
                <h2>Progress</h2>
             </div>
              <div >
                {
                  enrolledCourses.map((course)=>
                  (
                    <div key={course._id} className='grid grid-cols-[.6fr_.2fr_.2fr] gap-4 py-2 px-1'>
                    <Link to={`/accessCourse/${course._id}`}>
                        <div className='flex items-center gap-3'>
                          <img src={course?.thumbnail} alt={course?.name} className=' w-36 border border-richblack-800 aspect-video rounded-md' loading='lazy' />
                          <div >
                            <h2 className='text-xl'>{course.courseName}</h2>
                            <p className='text-richblack-200'>{course.courseDescription.substring(0,100)+" ..."}</p>
                          </div>
                        </div></Link>

                        <div className='flex items-center'>
                            <p>Time 2:30 hrs</p>
                        </div>
                        
                        <div className='flex items-center'>
                           <div className='flex flex-col  p-2'>
                           <p>Progress {`${course?.progress || 0}%`}</p>
                           <ProgressBar completed={course.progress || 0} height='8px'  />
                           </div>
                           <div className='relative'>
                            <BsThreeDotsVertical/>
                             <div className='aboslute'>
                              {/* add remove course and complete mark*/}
                             </div>
                           </div>
                        </div>
                    </div>
                  ))
                }
              </div>
           </div>
         </div>))
       }
    </div>
  )
}

export default EnrolledCourses