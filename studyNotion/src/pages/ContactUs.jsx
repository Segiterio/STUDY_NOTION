import React from 'react'
import { useForm } from 'react-hook-form'
import Footer from '../components/cors/Footer';
import ContactForm from '../components/forms/ContactForm';
import {IoIosChatboxes,IoIosCall} from "react-icons/io";
import {ImEarth} from 'react-icons/im'

const ContactUs = () => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm({
    });
    return (
        <div className='bg-richblack-900'>
            <div className='max-w-maxContent w-11/12 mx-auto py-12'>
                <div className='flex gap-5'>
                    <div className='bg-richblack-800 rounded-md self-start w-2/5 p-5 flex flex-col gap-3'>
                          
                        <div className='flex gap-2 '>
                           <IoIosChatboxes className='text-richblack-100 relative top-1'/>
                           <div>
                               <h2 className='text-richblack-5 font-bold'>Chat on us</h2>
                               <p className='text-sm  text-richblack-200 '>Our friendly team is here to help.</p>
                               <p className='text-sm text-richblack-200 '>@mail address</p>
                           </div> 
                        </div>
                        <div  className='flex gap-2 '>
                            <ImEarth className='text-richblack-100 relative top-1'/>
                        <div >
                               <h2 className='text-richblack-5 font-bold'>Visit us</h2>
                               <p className='text-sm text-richblack-200 '>Come and say hello at our office HQ.</p>
                               <p className='text-sm text-richblack-200 '>Here is the location/ address</p>
                           </div> 
                        </div>
                        <div className='flex gap-2 '>
                            <IoIosCall className='text-richblack-100 relative top-1'/>
                         <div>
                               <h2 className='text-richblack-5 font-bold'>Call us</h2>
                               <p className='text-sm text-richblack-200 '>Here is the location/ address</p>
                               <p className='text-sm text-richblack-200 '>+123 456 7890</p>
                           </div> 
                        </div>     
                    </div>
                  
                    <div className='flex flex-col gap-4 p-5 w-3/5 border border-richblack-700 rounded-xl'>
                            <h2 className='text-3xl font-semibold text-richblack-5'>Got a Idea? We’ve got the skills. Let’s team up</h2>
                            <p className='text-richblack-300'>Tall us more about yourself and what you’re got in mind.</p>

                        <ContactForm register={register} handleSubmit={handleSubmit} reset={reset} errors={errors} />
                    </div>
                </div>
            </div>
           <Footer />
          
        </div>
    )
}

export default ContactUs