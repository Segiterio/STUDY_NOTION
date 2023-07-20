import React from 'react'
import { TypeAnimation } from 'react-type-animation'

export const Coding = () => {
   
    const typeSentence = "<!Doctype html>\n<html>\n<head><title>Example</\ntitle><link rel='stylesheet'\nhref='styles.css'></head>\n<body>\n<h1><a href='/'>Header </a>\n</h1>\n<nav> <a href='one/'>One</a><a href=\n'Two/'>Two</a<a href='Three/'>\nThree</a></nav>";
  return (
    <div className='flex relative gap-2 font-medium text-xs  sm:text-base'>
         <div className='text-richblack-500 flex flex-col items-center'>
                <div>1</div>
                <div>2</div>
                <div>3</div>
                <div>4</div>
                <div>5</div>
                <div>6</div>
                <div>7</div>
                <div>8</div>
                <div>9</div>
                <div>10</div>
                <div>11</div>
             </div>

           <div className='relative'>
           {/* <div className={`absolute 
            bg-yellow-100 h-6 top-0 w-[160px]` }></div> */}
        <TypeAnimation sequence
        ={[typeSentence,1000,""
        ]}
        wrapper='div'
        className='whitespace-pre first-line:text-yellow-100 '
        cursor={true} repeat={Infinity} omitDeletionAnimation={true}  />
            </div>    
    </div>
  )
}

// 