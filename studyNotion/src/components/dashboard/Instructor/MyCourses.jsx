import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../../cors/Loader';
import { deleteCourse, getInstructorCourses } from '../../../Functions/Instructorfun';
import { useState,useEffect,useRef } from 'react';
import {VscEdit} from "react-icons/vsc"
import {RiDeleteBin6Line} from "react-icons/ri"
import {BsFillStopwatchFill,BsFillCheckCircleFill} from "react-icons/bs"
import {GrAddCircle} from "react-icons/gr"
import { resetCourseState, setCourse, setEditCourse } from '../../../Redux/Slices/course';
import { useNavigate } from 'react-router-dom';
import ConfirnmationModal from '../ConfirnmationModal';


const MyCourses = () => {

  const {token} = useSelector(state => state.auth);
  const {loading} = useSelector(state => state.course);
  const [myCourses, setMyCourse] = useState([]);
  const [courseDeleteModal,setCourseDeleteModal] = useState(false);
  const [cName,setCName ]= useState(null);
  const cId  = useRef();
  
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(()=>
  {
    (async()=>{
  const courses = await getInstructorCourses(dispatch,token);
   console.log("mycoreses", courses)
   setMyCourse(courses);
   })();//imidiatly invoke function
    
  },[])

  return (
    <div className='text-white mt-5'>
    <h2 className='text-2xl'>My Course</h2>
    {loading ? (<Loader />): (<div className='flex flex-col'>  
                   <button className=' w-fit self-end bg-yellow-50 border rounded-md py-3  px-6 border-richblack-400 text-black relative -top-7 flex items-center gap-1 text-sm'  onClick={
                     () =>
                     { dispatch(resetCourseState());
                       navigate("/dashboard/add-course");
                       
                     }
                   }><GrAddCircle/>New</button>  
                  <div className='grid grid-cols-[1fr_100px_100px_100px] text-richblack-100 font-normal border p-4 border-b-transparent rounded-t-md '>
                    <div>Course</div>
                    <div>Duration</div>
                    <div>Price</div>
                    <div>Actions</div>
                  </div>
                  <div className='grid gap-5 border-[1px] border-richblack-100 p-4 rounded-b-md'>
                    {
                      myCourses.map((course) => (
                        
                        <div key={course._id} className='grid grid-cols-[1fr_100px_100px_100px] items-center'> 

                         <div className='grid grid-cols-2 gap-4 '>
                         <div className=''>
                           <img src={course?.thumbnail} alt={course?.title} className='rounded-md object-cover' />
                           </div>
                           <div className='flex flex-col justify-between '>
                           <h2 className='text-xl'>{course.courseName}</h2>
                          <p className='text-richblack-100 font-normal text-sm'>{course.courseDescription}</p>
                          <div className='text-richblack-100 font-normal text-sm'>
                            {`Created : $`}
                          </div>
                          <div className='w-fit px-3 py-1 rounded-2xl text-sm font-normal bg-richblack-700'>
                             <div className='flex gap-1 items-center'>
                              {course.status[0] == "P" ? <BsFillCheckCircleFill className='text-yellow-100'/> : <BsFillStopwatchFill className='text-pink-100'/>   }<div className={`${course.status[0] == "P" ? "text-yellow-100" : "text-pink-100" }`}>{course.status}
                             </div></div>
                          </div>
                         </div>
                         </div>

                         <div>10:00 hr</div>
                         <div>{
                         course.price}</div>

                         <div className='flex gap-4'>
                           <VscEdit onClick={() =>
                           {
                              dispatch(setCourse(course));
                              dispatch(setEditCourse(true));
                              navigate("/dashboard/add-course");
                           }} />
                           <RiDeleteBin6Line className='hover:cursor-pointer' onClick={() =>
                           { setCName(course.courseName)
                             cId.current = course._id;
                             setCourseDeleteModal(true);
                             console.log("HI")
                           }} />
                           </div>
                       
                        </div>
                       ))
                    }
                  </div>
                {courseDeleteModal &&  <ConfirnmationModal setModal={setCourseDeleteModal} text1={"Are you Sure ? "}  text2={`You are going to Delete "${cName}".`}  onclick={() => deleteCourse(cId.current)} btn={"Delete"} />}
    </div>)}
    </div>
  )
}

export default MyCourses