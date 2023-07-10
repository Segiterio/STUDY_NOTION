import React from 'react'
import Highlighted from './Highlighted'
import CLXbutton from './CLXbutton'
import Plan from "../../../assets/Images/Plan_your_lessons.svg"
import Know from "../../../assets/Images/Know_your_progress.svg"
import Compare from "../../../assets/Images/Compare_with_others.svg"

export const Learings = () => {
    return (
        <div className='py-24 flex flex-col items-center'>
            {/* heading  */}
            <div className='sm:text-center max-w-3xl'>
                <div className=" text-3xl sm:text-4xl font-bold 
">Your Swiss knife for<Highlighted color={"bg-gradient-to-r from-blue-100 to-caribbeangreen-100 bg-clip-text text-transparent"}> learning any language </Highlighted></div>
                <div className='pt-4'>
                    Using spin making learning multiple languages easy. with 20+ languages realistic voice-over, progress tracking, custom schedule and more.
                </div>
            </div>
            {/* images  */}
            <div className='flex flex-col sm:flex-row py-5 items-center'>
                <img src={Know} alt="Know your progress" className=''/>
                <img src={Compare} alt="compare with others"  />
                <img src={Plan} alt="Plan your lessons" className=''/>
            </div>
            {/* button  */}
            <CLXbutton active={true} go="/">Learn more</CLXbutton>
        </div>
    )
}
