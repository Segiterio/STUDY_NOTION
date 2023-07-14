import React from 'react'
import Highlighted from './Highlighted'
import CLXbutton from './CLXbutton'
import Plan from "../../../assets/Images/Plan_your_lessons.svg"
import Know from "../../../assets/Images/Know_your_progress.svg"
import Compare from "../../../assets/Images/Compare_with_others.svg"

export const Learings = () => {
    return (
        <div className='md:py-24 py-10 flex flex-col items-center'>
            {/* heading  */}
            <div className='sm:text-center'>
                <div className=" sm:text-3xl text-2xl font-bold 
">Your Swiss knife for<Highlighted color={"bg-gradient-to-r from-blue-100 to-caribbeangreen-100 bg-clip-text text-transparent"}> learning any language </Highlighted></div>
                <div className='pt-4'>
                    Using spin making learning multiple languages easy. with 20+ languages realistic voice-over, progress tracking, custom schedule and more.
                </div>
            </div>
            {/* images  */}
            <div className='grid md:grid-cols-3 place-items-center my-5'>
                <img src={Know} alt="Know your progress" className='relative md:-right-[30%] top-[20%] md:top-0' loading='lazy' />
                <img src={Compare} className='relative z-10 '  alt="compare with others" loading='lazy' />
                <img src={Plan} alt="Plan your lessons" className='relative md:-left-[30%] md:bottom-0 bottom-[20%]'  loading='lazy'/>
            </div>
            {/* button  */}
            <CLXbutton active={true} go="/">Learn more</CLXbutton>
        </div>
    )
}
