import React, { useEffect, useState } from 'react'
import {RxCross2} from 'react-icons/rx'
import DropZone from './DropZone'
import { useForm } from 'react-hook-form'
import { apiConnector } from '../../../axios/instance'
import { toast } from 'react-toastify'
import { useDispatch, useSelector } from 'react-redux'
import { setCourse, setStep } from '../../../Redux/Slices/course';
import { subSectionPoints } from '../../../axios/services/apis'
import axios from 'axios'

const CreateSubSection = ({ setSubSectionModal, mode , sectionId ,course}) => {
    const dispatch = useDispatch();
    const {subSectionId} = useSelector(state => state.subSection);
    const { register, formState: { error }, setValue, getValues, handleSubmit } = useForm();
    const [thumbnail, setThumbnail] = useState(null);
    const [previewSource, setPreviewSource] = useState(null);
    const {token} = useSelector(state => state.auth);

    // handle submit of useForm hook
    //calling subSection api to get data store in 

   async function getSubSectionDetails()
   {
     try
     {  
      console.log("sub in create ediding sub section ", subSectionId, `\n ${token}`)  
        const response = await apiConnector("POST",subSectionPoints.GET_SUBSECTION_DETAIL,{subSectionId}, {
          Authorization:`Bearer ${token}`
        })
         const subSectionDetails = response.data.data;
         console.log("dta ",response);
         setValue("lectureTitle", subSectionDetails?.title);
         setValue("lectureDescription", subSectionDetails?.description);
         setPreviewSource(subSectionDetails?.videoUrl);
     }
     catch(error)
     {
       console.log("error in front end while fetch sub section detail", error)
     }
   }
 
    useEffect(() =>
    {
       if(mode == 2 || mode == 3 )
       {   
          getSubSectionDetails();
       }
    },[]);

  async function subSectionSubmit(data)
    {   
        const toastId = toast.loading("Please wait...") 
        try{
            const formData = new FormData();
            formData.append("video", thumbnail);
            formData.append("title",data.lectureTitle)
            formData.append("description", data.lectureDescription);
            formData.append("courseId",course._id);
            let response;
            if(mode == 2)
            { 
                formData.append("subSectionId", subSectionId);

                response = await apiConnector("POST", "http://localhost:4000/api/v1/course/updateSubSection",formData, {
                  Authorization: `Bearer ${token}`
                })
              }
            else{
              formData.append("sectionId", sectionId);
              response = await apiConnector("POST", "http://localhost:4000/api/v1/course/addSubSection",formData, {
                Authorization: `Bearer ${token}`
              })
            }
              toast.dismiss(toastId);
              toast.success(response.data.message);
              console.log("response in create subSection ", response);
              dispatch(setCourse(response.data.data));
              setSubSectionModal(false);
        }catch(error)
           {
              toast.dismiss(toastId);
              toast.error("Error in Sub Section")
              console.log("error in create subSection ", error);
        }
    }
    return (
        <div className='absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center z-10 bg-richblack-900 bg-opacity-30 '>

            <div className='rounded-md overflow-clip border-richblack-600 border w-1/4 max-w-[450px]'>

                <div className='flex items-center justify-between p-2 bg-richblack-700'>
                    <h2>{
                        mode == 1 ? "Create" : mode == 2 ? "Editing" : "Viewing"
                    } lecture</h2>
                    {/* icons x */}
                    <RxCross2 onClick={(e) =>
        {    
             setSubSectionModal(false)
        }} />
                </div>
                <form className='bg-richblack-800 p-2 flex flex-col gap-3' onSubmit={handleSubmit(subSectionSubmit)} >


                    <DropZone setPreviewSource={setPreviewSource} label={"Lecture Video"}
                        video={true}
                        setThumbnail={setThumbnail}
                        previewSource={previewSource}
                    />
                  {/* title */}
                    <div className='flex flex-col'>
                        <label htmlFor="lectureTitle" className='font-medium text-sm' >Lecture Title<sup className="text-[#f00]">*</sup></label>
                        <input type="text" id="lectureTitle" className='bg-richblack-700 rounded-md  shadow-[0_1px_rgba(255,255,252,0.3)] focus:outline-none p-3 text-sm' {...register("lectureTitle", { required: true })} placeholder='Enter Title' readOnly={mode == 3 ? true : false} />
                    </div>
{/* Description */}
                    <div className='flex flex-col'>
                        <label htmlFor="lectureDescription" className=' font-medium text-sm' >Lecture Description<sup className="text-[#f00]">*</sup></label>
                        <textarea readOnly={mode == 3 ? true : false} rows='5' id="lectureDescription" className='bg-richblack-700 rounded-md shadow-[0_1px_rgba(255,255,252,0.3)] focus:outline-none p-3 text-sm' placeholder='Enter Lecture Description' {...register("lectureDescription", { required: true }) }></textarea>
                    </div>
{/* buttons */}
                  { mode != 3 && <div className='self-end  flex gap-2'>
                      <button className='bg-richblack-700 border rounded-md p-1 border-richblack-400' onClick={()=>
                      {
                            setSubSectionModal(false);
                      }}>cancel</button>

                      <button 
                      className='bg-yellow-100 border rounded-md p-1 border-richblack-400 text-black' type="submit"  
                      > {mode == 2 ?"Save changes":"Save"}</button>
                  </div>}
                </form>
            </div>
        </div>
    )
}

export default CreateSubSection