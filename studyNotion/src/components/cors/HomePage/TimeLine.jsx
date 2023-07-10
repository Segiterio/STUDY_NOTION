import React from 'react'
import Logo1 from "../../../assets/TimeLineLogo/Logo1.svg"
import Logo2 from "../../../assets/TimeLineLogo/Logo2.svg"
import Logo3 from "../../../assets/TimeLineLogo/Logo3.svg"
import Logo4 from "../../../assets/TimeLineLogo/Logo4.svg"
import TimelineImage from "../../../assets/Images/TimelineImage.png"

export const TimeLine = () => {

    const timeLineData = [{
        logo: Logo1,
        heading: "Leadership",
        description: "Fully Committed to the success company"
    },
    {
        logo: Logo2,
        heading: "Responsibility",
        description: "Students will always be out top priority"
    },
    {
        logo: Logo3,
        heading: "Flexbility",
        description: "The ability to Switch is an important skills"
    },
    {
        logo: Logo4,
        heading: "Solve the problem",
        description: "code your way to a solution"
    }]

    return ( 
        <div className='flex flex-col md:flex-row lg:justify-between justify-center gap-5 sm:flex-wrap items-center p-6 border'>
            <div className='flex border'>
                <div className='flex flex-col gap-12 '>
                    {
                        timeLineData.map((item, index) => {
                            return <div key={index}>
                            <div className='flex gap-10 sm:gap-20 '>
                                <div className='w-8 h-8 sm:w-14 sm:h-14 flex justify-center my-auto items-center rounded-full bg-white shadow-md relative '>
                                {index < timeLineData.length-1 && <div className='border-l-2 border-dashed h-12 sm:h-8 absolute -bottom-14 sm:-bottom-10 border-richblack-400 '></div>}
                                    <img src={item.logo} className='w-1/3' alt={item.heading} />
                                </div>
                                <div>
                                    <h3 className='text-lg font-bold'>{item.heading}</h3>
                                    <p className='text-[14px]'>{item.description}</p>
                                </div>
                               </div>
                            </div>
                        })
                    }

                </div>
            </div>

            <div className='relative border'>
                <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full bg-blue-300 h-[70%] rounded-[350px/180px] blur-2xl '>
                </div>

                <img src={TimelineImage} alt="Time Line didi" className='shadow-[20px_20px] relative  shadow-white' />

                <div className='absolute flex w-[80%] justify-around left-1/2 -translate-x-1/2 -translate-y-1/2 bg-caribbeangreen-700 md:p-10 p-2'>
                    <div className='flex items-center md:gap-5 gap-1'>
                        <div className='font-bold flex gap-5 md:text-4xl text-white'>10</div>
                        <div className='leading-4 md:text-[14px] text-[10px] text-caribbeangreen-300'>YEARS <br />EXPERIENCES</div>
                    </div>
                    <div className='w-[1px]  bg-caribbeangreen-500 self-center h-5'>
                    </div>
                    <div className='flex items-center md:gap-5 gap-1'>
                        <div className='font-bold flex gap-5 md:text-4xl text-white'>250</div>
                        <div className='leading-4 md:text-[14px] text-[10px] text-caribbeangreen-300'>TYPES OF <br /> COURSES</div>
                    </div>
                </div>


            </div>

        </div>

    )
}
