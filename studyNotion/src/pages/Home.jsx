import React from 'react'
import { Link } from 'react-router-dom'
import { FaArrowRight } from "react-icons/fa"
import Highlighted from "../components/cors/HomePage/Highlighted";
import CLXbutton from "../components/cors/HomePage/CLXbutton";
import banner from "../assets/Images/banner.mp4"
import { Coding } from '../components/cors/HomePage/Coding';
import { TimeLine } from '../components/cors/HomePage/TimeLine';
import { Learings } from '../components/cors/HomePage/Learings';
import Instructor from "../assets/Images/Instructor.png"
import ExploreCards from '../components/cors/HomePage/ExploreCards';

export const Home = () => {

  const para = 'With our online coding courses, you can learn at your own pace, from anywhere in the world, and get access to a wealth of resources, including hands-on projects, quizzes, and personalized feedback from instructors.';

  return (
    <div className="w-screen flex flex-col bg-richblack-900 relative top-8">
      {/* section 1 */}
      <div className='w-11/12 flex flex-col mt-5 mx-auto items-start sm:items-center  text-white gap-5 max-w-maxContent'>
        <Link to="/signup">
          <div className='bg-richblack-800 rounded-full flex justify-start px-4 py-2 hover:scale-95 duration-200 shadow-[0px_1px_0px_rgba(255,255,255,0.18)] border-4 border-richblack-800  '>
            <div className='text-richblack-200 animateSlide '>
              <p className='flex items-center gap-2 '>Became an Instructor<FaArrowRight className='arrowAnimation' /></p>
            </div>
          </div>
        </Link>
        <div className="text-3xl sm:text-4xl font-bold text-richblack-5 
        "> Empower Your Future With <Highlighted color={"bg-gradient-to-r from-blue-100 to-caribbeangreen-100 bg-clip-text text-transparent"}>Coding Skills</Highlighted>
        </div>

        <p className="font-medium text-richblack-200 sm:text-center ">{para}</p>

        <div className='flex gap-10'>
          <CLXbutton active={true} go={"/signup"}>Learn More</CLXbutton>

          <CLXbutton active={false} go={"/signup"}>Book demo</CLXbutton>
        </div>

        <div className='shadow-[15px_15px] relative '>

          <div className='absolute w-40 h-40 sm:w-72 sm:h-72 top-0 left-1/2 -translate-x-1/2 shadow-[0px_0px_150px] shadow-blue-100 rounded-full'></div>

          <video autoPlay={true} muted={true} loop={true} className='relative'>
            <source src={banner} type="video/mp4" />
          </video>

        </div>

        {/* coding section 1 */}

        <div className='flex flex-col sm:flex-row sm:justify-between gap-10 sm:py-20 py-4 w-full'>
          {/* Right part */}
          <div className='flex flex-col gap-8 sm:w-1/2 justify-between'>
            <div>
              <div className="text-3xl sm:text-4xl capitalize font-bold text-richblack-5 
        "> Unlock your <Highlighted color={"bg-gradient-to-r from-blue-100 to-caribbeangreen-100 bg-clip-text text-transparent"}>coding Potential </Highlighted>with our online courses
              </div>

              <div className="font-medium text-richblack-200 pt-3">
                Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you.
              </div>
            </div>


            <div className='flex gap-8 animateSlide'>
              <CLXbutton active={true} go={"/"} >Try it your self <FaArrowRight className='arrowAnimation' /></CLXbutton>
              <CLXbutton active={false} go={"/"} >Learn More</CLXbutton>
            </div>
          </div>

          {/* Left part */}
          <div className='sm:w-1/2 relative p-2 shadow-[-1px_-1px] shadow-richblack-400'>
            {/* oval gradient */}
            <div className='absolute w-60 h-40 top-4 left-4 rounded-[230px/150px] blur-3xl hi'></div>
            {/* background behind TypeAnimation */}
            <div className='absolute left-0 right-0 top-0 bottom-0 bg-richblack-800 opacity-70'></div>
            {/* TypeAnimation block */}
            <Coding />
          </div>
        </div>
        {/* bg-gradient-to-r from-pink-200 to-yellow-200  */}
        {/* coding section 2 */}
        <div className='flex flex-col sm:flex-row-reverse justify-between gap-10 sm:py-20 w-full'>


          {/* Right part */}
          <div className='flex flex-col gap-8 sm:w-1/2 justify-between'>

            <div className='w-full'>
              <div className="text-3xl sm:text-4xl font-bold text-richblack-5 
">Start <Highlighted color={"bg-gradient-to-r from-blue-100 to-caribbeangreen-100 bg-clip-text text-transparent"}>coding <br />in seconds </Highlighted></div>
              <div className="font-medium text-richblack-200 pt-4">
                Go ahead, give it a try. Our hands-on learning environment means you'll be writing real code from your very first lesson.
              </div>
            </div>
            <div className='flex gap-5 animateSlide'>
              <CLXbutton active={true} go={"/"} >Continue Lesson<FaArrowRight className='arrowAnimation' /></CLXbutton>
              <CLXbutton active={false} go={"/"} >Learn More</CLXbutton>
            </div>
          </div>

          {/* Left part */}
          <div className='sm:w-1/2 min-h-fit relative p-2 shadow-[-1px_-1px] shadow-richblack-400'>
            {/* oval gradient */}
            <div className='absolute w-60 h-40 top-4 left-4 bg-gradient-to-r from-blue-200 to-blue-500 rounded-[230px/150px] blur-3xl'></div>
            {/* background behind TypeAnimation */}
            <div className='absolute left-0 right-0 top-0 bottom-0 bg-richblack-800 opacity-70'></div>
            {/* TypeAnimation block */}
            <Coding />
          </div>
        </div>

        {/* Unlock the power of code section */}

        <div>
          <div className="text-3xl sm:text-4xl font-bold text-center text-richblack-5 
">Unlock the <Highlighted color={"bg-gradient-to-r from-blue-100 to-caribbeangreen-100 bg-clip-text text-transparent"}>Power of Code </Highlighted></div>
          <div className="font-medium text-richblack-200 pt-4 text-center">
            Learn to Build Anything You Can Imagine
          </div>

          {/* Tags Explorer */}
          <ExploreCards />

        </div>
      </div>
      {/* section 2 */}

      <div className='w-screen bg-richblack-5 '>
        <div className='homeBg h-64 flex justify-center items-center'>
          <div className='flex gap-5 text-richblack-5 font-semibold '>
          <div className='animateSlide'>
            <CLXbutton active={true} go={"/"}>Explore full Cataloge <FaArrowRight className='arrowAnimation'/></CLXbutton></div>
            <CLXbutton active={false} go={"/"}>Learn More</CLXbutton>
          </div>

        </div>

        <div className='w-11/12 max-w-maxContent mx-auto py-20'>

          <div className='w-11/12 flex flex-col sm:flex-row sm:justify-between gap-10 py-5'>
            <div className='sm:w-1/2 text-4xl font-semibold'>
              Get the skills you need for a <Highlighted color={"bg-gradient-to-r from-blue-100 to-caribbeangreen-100 bg-clip-text text-transparent"}>job that is in demand</Highlighted>
            </div>
            <div className='sm:w-1/2 flex flex-col gap-10'>

              <div>The modern StudyNotion is the dictates its own terms. Today, to be a competitive specialist requires more than professional skills.</div>
              <div className='self-start'>
                <CLXbutton active={true} go={"/"}>Learn More</CLXbutton></div>
            </div>
          </div>
          <TimeLine />
          <Learings />
        </div>
      </div>

      {/* section 3 */}

      <div className='max-w-maxContent mx-auto w-11/12'>

        <div className='py-20 flex flex-col sm:flex-row gap-10'>
          <div className='sm:w-1/2 shadow-[-20px_-20px] shadow-white'>
            <img src={Instructor} alt="Instructor" loading='lazy'/>
          </div>
          <div className='flex flex-col sm:w-1/2  justify-evenly'>

            <div className='w-[90%]'>
              <div className="text-3xl sm:text-4xl font-bold text-richblack-5 
">Become an <Highlighted color={"bg-gradient-to-r from-blue-100 to-caribbeangreen-100"}> <br/> Instructor</Highlighted></div>
              <div className='text-richblack-300 my-5'>
                Instructors from around the world teach millions of students on StudyNotion. We provide the tools and skills to teach what you love.
              </div>
            </div>
            <div className='self-start animateSlide'>
              <CLXbutton active={true} go={"/signup"}>Start Teaching Today <FaArrowRight className='arrowAnimation'/></CLXbutton>
            </div>
          </div>
        </div>

        <div className='py-20'>

          <div className='text-3xl sm:text-4xl font-bold text-center text-richblack-5'>Reviews from other learners</div>

          <div>



          </div>

        </div>

      </div>
    </div>
  )
}
