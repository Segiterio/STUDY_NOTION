import React from 'react'
import { BiCheck } from 'react-icons/bi';
import { useSelector } from 'react-redux'

const RenderSteps = () => {
    const { step } = useSelector(state => state.course);

    const steps = [
        {
            id: 1,
            title: "Course Information"
        },
        {
            id: 2,
            title: "Course Builder"
        },
        {
            id: 3,
            title: "Publish"
        },
    ]
    return (
        <div className='flex justify-around my-2'>
            {
                steps.map((item) =>
                (<div key={item.id} className='flex flex-col items-center text-white gap-2'>
                    <div className={`${item.id <= step ? "bg-yellow-800 text-yellow-50" : " bg-richblack-600 text-richblack-300"} rounded-full w-6 h-6 flex flex-col items-center justify-center`}>
                        {
                            step > item.id ? <BiCheck className='bg-yellow-50 w-full h-full rounded-full text-white border border-yellow-50'/> : <p>{item.id}</p>
                        }
                    </div>
                    <p className={`text-xs ${ item.id < step ? " text-white " : item.id == step ? "text-richblack-600"  : "text-richblack-700" } font-medium `}>{item.title}</p>
                </div>
                )
                )
            }
        </div>
    )
}

export default RenderSteps