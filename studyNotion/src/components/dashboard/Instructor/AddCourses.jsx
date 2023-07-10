import React from 'react'
import RenderSteps from './RenderSteps'
import { AiFillThunderbolt } from 'react-icons/ai'
import {useSelector } from 'react-redux'
import CIForm from './CIForm'
import Publish from './Publish'
import CBForm from './CBForm'

const AddCourses = () => {
    const { step } = useSelector(state => state.course);

    return ( 
            <div className=' flex items-start'>
                {/* Render Steps */}
                <div className='flex-grow
                flex flex-col'>
                
                    <h1 className='text-2xl mb-2 text-white'>AddCourses</h1>
                   
                    <RenderSteps />
                    {/* forms */}
                    {step === 1 && <CIForm />}
                    {step === 2 && <CBForm />}
                    {step === 3 && <Publish />}
                  
                </div>

                {/* form tips part */}
            
                <div className='p-2 sticky top-11 rounded-lg bg-richblack-800 text-richblack-5 max-w-[336px] '>
                    <div className='flex items-center'><AiFillThunderbolt className='text-yellow-5 mr-1' /> <h2>Course Uplaod Tips</h2></div>
                    <ul className='flex flex-col gap-2 text-[12px] list-disc pl-6'>
                        <li>Set the Course Price option or make it free.</li>
                        <li>Standard size for the course thumbnail is 1024x576.</li>
                        <li>Video section controls the course overview video.</li>
                        <li>Course Builder is where you create & organize a course.</li>
                        <li>Add Topics in the Course Builder section to create lessons, quizzes, and assignments.</li>
                        <li>Information from the Additional Data section shows up on the course single page.</li>
                        <li>Make Announcements to notify any important</li>
                        <li>Notes to all enrolled students at once.</li>
                    </ul>
                    </div>
            </div>  
    )
}

export default AddCourses