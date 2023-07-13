import React, { useEffect, useState,useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom'
import { setLoading } from "../../Redux/Slices/auth"
import { buyCourse, getCourseDetails } from '../../Functions/Userfun';
import Loader from "../../components/cors/Loader"
import { ImStarFull, ImStarHalf, ImStarEmpty } from 'react-icons/im';
import { RiGlobalLine } from "react-icons/ri"
import { BsInfoCircleFill } from "react-icons/bs"
import ReactStars from "react-rating-stars-component";
import { PiTelevisionSimpleDuotone } from "react-icons/pi"
import {AiFillCaretDown} from "react-icons/ai"
import { AddToCart } from '../../Redux/Slices/cart';
import { toast } from 'react-toastify';
import {RiArrowUpSLine} from "react-icons/ri"

const CourseDetails = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const user = useSelector(state => state.profile);

  const {cart} = useSelector(state => state.cart);
  const dispatch = useDispatch();
  const [courseIdData, setCourseIdData] = useState(null);
  const { loading,token } = useSelector(state => state.auth);
  console.log("Paamas", courseId);
  useEffect(() => {
    dispatch(setLoading(true))
    console.log("Category ID ", courseId);
    (async () => await getCourseDetails(courseId, setCourseIdData))();
    dispatch(setLoading(false));
    //get course by Category ID
  }, [courseId])

  return (
    <div className='bg-richblack-900 pt-10'>
      {
        loading ? <Loader /> : <div className=''>
          {/*bg-richblack-800 */}
          <div className='bg-richblack-800 py-5'>
            <div className='max-w-maxContent relative mx-auto flex w-11/12'>
              {/* course Details */}
              <div className='flex flex-col gap-2 border-r border-richblack-700 w-[75%]'>
                <h1 className='text-3xl font-semibold text-richblack-5'>{courseIdData?.courseName}</h1>
                <p className='text-sm text-richblack-200'>{courseIdData?.courseDescription}</p>
                <div className='flex items-center gap-3'>

                  <div className='flex gap-1 items-center'>
                    {/* rating in value */}
                    <div className='text-yellow-100' >{courseIdData?.rating}4.8</div>
                    <ReactStars
                      count={5}
                      size={24}
                      emptyIcon={<ImStarEmpty />}
                      filledIcon={<ImStarFull />}
                      halfIcon={<ImStarHalf />}
                      value={3.7}
                      isHalf={true}
                      edit={false}
                      activeColor="#ffd700"
                    />
                    {/* review count */}
                    <div></div>
                  </div>

                  <div className='text-richblack-25 '>{0} ratings</div>
                  <div className='text-richblack-25 '>{5} students</div>

                </div>

                <p className='text-richblack-25 '>Created by {courseIdData?.instructor.firstName + " " + courseIdData?.instructor.lastName}</p>
                <div className='text-richblack-25 flex  gap-5'>
                  {/* created and language */}
                  <div className='flex items-center gap-3'>
                    {/* react icon add i */}
                    <BsInfoCircleFill />
                    <div>Created At {courseIdData?.createdAt}</div>
                  </div>
                  <div className='flex items-center gap-3'>
                    {/* react icon add earth  */}
                    <RiGlobalLine />
                    <div>English</div>
                  </div>
                </div>
              </div>
              {/* card */}
              <div className='flex flex-col rounded-md absolute right-0 overflow-clip md:w-60 w-[20%] z-[3]'>
                {/* image */}
                <div><img src={courseIdData?.thumbnail} alt={courseIdData?.courseName} loading='lazy' className='object-cover'
                /></div>
                <div className='bg-richblack-700 flex flex-col gap-2 p-2'>
                  {/* price and buttons */}
                  <div className='flex flex-col gap-2'>

                    {/* price */}
                    <div className='font-bold text-xl text-richblack-5'>Rs. {courseIdData?.price}</div>
                    <div className='flex flex-col gap-2 font-semibold text-sm'>
                      <button className='bg-yellow-100 rounded-md text-richblack-900 p-2' onClick={() =>
                      { const checkInCart = cart.find(value => value._id == courseIdData._id)
                       if(!checkInCart)
                       {
                       dispatch(AddToCart(courseIdData));
                       toast.success("Item Added");
                       } 
                       else
                        toast.warning("Item Already in Cart");
                      }}>Add to Cart</button>
                      <button className='bg-richblack-800 rounded-md text-richblack-5 p-2' 
                       onClick={() =>
                       {
                          buyCourse(token,[courseId],user,navigate,dispatch)
                       }}>Buy now</button>
                    </div>
                    <div className='self-center text-richblack-25 text-sm'>
                      30-Day Money Back Guarantee
                    </div>
                  </div>

                  {/* course features */}
                  <div className='px-5'>
                    <h2 className='text-richblack-5'>This course includes</h2>
                    <ul className='list-disc  text-caribbeangreen-100 text-sm'>
                      <li>8 hours on-demand video</li>
                      <li>Full Lifetime access</li>
                      <li>Access on Mobile and TV</li>
                      <li>Certificate of Completion</li>
                    </ul>
                  </div>
                  <button className='text-yellow-100 text-sm'>Share</button>
                </div>
              </div>
            </div>
          </div>

          {/* bg-richblack-900 */}
          <div className='bg-richblack-900 relative'>
            <div className='max-w-maxContent mx-auto text-richblack-5 w-11/12 '>

              <div className='w-[75%]'>
                {/* What you learn */}
                <div></div>
                {/* course content container */}
                <div>
                  {/* header */}
                  <div>

                  </div>
                  {/*  course content */}
                  <div>
                    {
                      courseIdData?.courseContent.map((section) => (
                        <details key={section._id} className='border border-richblack-800 my-4'>
                          <summary className='flex  justify-between items-center px-5 py-2 bg-richblack-700'>
                            <div className='flex items-center gap-5'>
                              {/* icons arrow add */}
                              <div className='downUp'>
                                 <RiArrowUpSLine/>
                                    </div>
                              
                              <div>{section.sectionName}</div>
                            </div>

                            <div className='flex items-center gap-5' >
                              <p>{section.subSection.length} Lectures</p>

                              <p>{ } time</p>

                            </div>

                          </summary>

                          <div className='px-5 py-2 flex flex-col '>
                            {section.subSection.map((subSection) => (
                              <details key={subSection._id}>
                                <summary className='flex justify-between px-5'>
                                  <div className='flex items-center gap-3'>
                                    {/* tv icons */}
                                    <PiTelevisionSimpleDuotone />
                                    <div>{subSection.title}</div>
                                    {/* arrow */}
                                    <AiFillCaretDown />

                                  </div>
                                  <div>{Number(subSection?.timeDuration).toFixed(2)}</div>
                                </summary>
                                <div className='px-16'>
                                  {subSection?.description}
                                </div>
                              </details>
                            ))}

                          </div>

                        </details>
                      ))
                    }

                  </div>

                </div>


                {/* author */}
                <div className=''>
                  <h2>Author</h2>
                  <div className='flex gap-5 items-center'>
                    <img src={courseIdData?.instructor?.image} alt={courseIdData?.instructor?.firstName} className='w-20 h-20  rounded-full object-cover' loading='lazy' />
                    <p className='capitalize'>{courseIdData?.instructor?.firstName + " " + courseIdData?.instructor?.lastName}</p>
                  </div>
                  {/* about of instructor */}
                  <p>I will be your lead trainer in this course. Within no time, I will help you to understand the subject in an easy manner. I have a huge experience in online training and recording videos. Let's get started!</p>
                </div>
              </div>

            </div>
          </div>
        </div>
      }
    </div>
  )
}

export default CourseDetails

// Basic knowledge of HTML and CSS: JavaScript is a scripting language that is used to make web pages more interactive. HTML and CSS are the languages used to create and style web pages. Having a basic understanding of these languages will help you understand how JavaScript works and how to use it to interact with HTML and CSS.
// Some familiarity with programming concepts: JavaScript is a programming language, so some familiarity with programming concepts will be helpful. This includes concepts such as variables, loops, and functions.