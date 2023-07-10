import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { GetUserEnrolledCourses } from '../../Functions/Userfun';
import ProgressBar from "@ramonak/react-progress-bar"

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
    <div className='text-white flex flex-col h-full'>
      <h1 className='text-2xl'>Enrolled Courses</h1>
       {
         !enrolledCourses ? <div className='my-auto self-center text-4xl font-normal text-richblack-600'>Loading...{console.log("loading")}</div> 
         : (!enrolledCourses.length > 0 ? (<p className='my-auto self-center text-4xl font-normal text-richblack-600'>You are not enrolled in any course yet</p>) : (<div>
           
           <tabel>
             <thead className='bg-richblack-700'>
              <tr>
                <th>Course Name</th>
                <th>Duration</th>
                <th>Progress</th>
              </tr>
             </thead>
              <tbody>
                {
                  enrolledCourses.map((course)=>
                  (
                    <tr>
                        <td className='flex items-center'>
                          <img src={course?.thumbnail} alt={course?.name} className='block w-8 h-8 rounded-md ' />
                          <div>
                            <h2>This is course Title</h2>
                            <p>This is discription</p>
                          </div>
                        </td>

                        <td className='flex items-center'>
                            <p>Time 2:30 hrs</p>
                        </td>

                        <td>
                           <p>Progress {`${course?.progress || 0}%`}</p>
                           <ProgressBar completed={course.progress || 0} height='8px' />
                        </td>
                    </tr>
                  ))
                }
              </tbody>
           </tabel>

         </div>))
       }
    </div>
  )
}

export default EnrolledCourses