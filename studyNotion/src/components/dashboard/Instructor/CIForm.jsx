import React from 'react'
import { useEffect, useState, useRef } from 'react';
import { useForm } from 'react-hook-form'
import { getCourseCategories } from '../../../Functions/Instructorfun';
import { RxCross2 } from "react-icons/rx"

import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { apiConnector } from '../../../axios/instance';
import DropZone from './DropZone';
import { setCourse, setStep,resetCourseState } from '../../../Redux/Slices/course';
import { toast } from 'react-toastify';
import {GrAddCircle} from "react-icons/gr";

const CIForm = () => {
    const [tag, setTags] = useState([]);
    const [requirements, setRequirements] = useState([]);
    const [courseCategories, setCourseCategories] = useState([]);
    const [previewSource, setPreviewSource] = useState(null);
    const [thumbnail, setThumbnail] = useState(null);
    const [loading, setLoading] = useState(false);
    const [video, setVideo] = useState(false);
    const req = useRef(null);

    const { token } = useSelector(state => state.auth);
    const dispatch = useDispatch();
    const { register, handleSubmit, formState: { errors }, setValue, getValues, watch,reset } = useForm({
        defaultValues:{
            courseName:"",
            courseDescription:"",
            category:"",
            whatYouWillLearn:"",
            price:undefined,
        }
    });
    const { course, editCourse } = useSelector(state => state.course);

    useEffect(() => {
        const getCategories = async () => {
            setLoading(true);
            const categories = await getCourseCategories();
            // console.log("categories list", categories);
            if (categories?.length > 0) {
                setCourseCategories(categories);
            }
            setLoading(false);
        }

        getCategories();
        if (editCourse) {
            console.log("course in edit course", course);
            setValue("courseName", course.courseName);
            setValue("courseDescription", course.courseDescription);
            setValue("price", course.price);
            setValue("whatYouWillLearn", course.whatYouWillLearn);
            setRequirements(course.instructions);
            setTags(course.tag);
            setPreviewSource(course.thumbnail);
            setValue("category", course?.category);
        }
    }, []);
    const onDataSubmit = async (data) => {
         const toastId = toast.loading("Please wait...")
        console.log("data in Ci form", data);
        console.log("thumbnail", thumbnail);
        try {
            console.log("thumbnail", thumbnail);
            const formdata = new FormData();
            
            formdata.append("thumbnailImage", thumbnail);
            formdata.append("price", data.price)
            formdata.append("category", data.category)
            formdata.append("courseName", data.courseName)
            formdata.append("courseDescription", data.courseDescription)
            formdata.append("whatYouWillLearn", data.whatYouWillLearn)
            //for send tag as array other wise it will send as string
            for (let x of tag) {
                formdata.append("tag", x);
            }
            //for send requirements as array other wise it will send as string 
            for (let x of requirements) {
                formdata.append("instructions", x);
            }

            let response;

            if(editCourse)
            {  
                //console.log("isformupdated ", isFromUpdated())
               if(isFromUpdated())
               {
                formdata.append("courseId", course._id);
                response = await apiConnector("PUT","http://localhost:4000/api/v1/course/editCourse", formdata ,{
                        Authorization :`Bearer ${token}`
                     })
               }
               else {
                toast.dismiss(toastId);
                toast.error("No changes made");
                return ;
               }
                 
            }
            else{
                
                response = await apiConnector("POST", "http://localhost:4000/api/v1/course/createCourse", formdata, {
                    Authorization: `Bearer ${token}`
                })
            }  
                //  :  !isFromUpdated() &&
     
            // const response = await axios.post("http://localhost:4000/api/v1/course/createCourse",formdata,{
            //     headers:{
            //         Authorization:`Bearer ${token}`
            //     }
            // })

            console.log("respoanse in cret course", response);
            toast.dismiss(toastId);
            toast.success(response?.data?.message)
            dispatch(setStep(2));
            dispatch(setCourse(response.data.data));

        } catch (error) {
            toast.dismiss(toastId);
            toast.error(error?.response?.data?.message)
            console.log("axios ", error)
        }
    }

    function isFromUpdated() {
        const currentValues = getValues();
        console.log("currentValues", currentValues)
        console.log("course slice data", course)
        if (currentValues.courseDescription != course.courseDescription || currentValues.courseName != course.courseName || 
            currentValues.price != course.price ||
            currentValues?.category != course?.category||
            currentValues.whatYouWillLearn != course.whatYouWillLearn || JSON.stringify(tag) != JSON.stringify(course.tag) || JSON.stringify(requirements) != JSON.stringify(course.instructions) || thumbnail != course.thumbnailImage )
            return true 
            else
            return false
    }

    return (
        <form className='text-richblack-5 w-11/12 mx-auto bg-richblack-800 p-4 rounded-md grid gap-3 ' onSubmit={handleSubmit(onDataSubmit)} >

            {/* course name */}
            <div className='flex flex-col'>
                <label htmlFor="courseName" className=' font-medium text-sm' >Course Name<sup className="text-[#f00]">*</sup></label>
                <input type="text" id="courseName" className='bg-richblack-700 rounded-md  shadow-[0_1px_rgba(255,255,252,0.3)] focus:outline-none p-3 text-sm' {...register("courseName", { required: true })} placeholder='Enter Course Title' />
            </div>

            {/* course Description */}
            <div className='flex flex-col'>
                <label htmlFor="courseDescription" className=' font-medium text-sm' >Course Description<sup className="text-[#f00]">*</sup></label>
                <textarea rows='5' id="courseDescription" className='bg-richblack-700 rounded-md  shadow-[0_1px_rgba(255,255,252,0.3)] focus:outline-none p-3 text-sm' placeholder='Enter Description' {...register("courseDescription", { required: true })} ></textarea>
            </div>

            {/* course price */}
            <div className='flex flex-col'>
                <label htmlFor="price" className=' font-medium text-sm' >Price<sup className="text-[#f00]">*</sup></label>
                <input type="text" id="price" className='bg-richblack-700 rounded-md  shadow-[0_1px_rgba(255,255,252,0.3)] focus:outline-none p-3 text-sm' {
                    ...register("price", { required: true, valueAsNumber: true })
                } placeholder='Enter Price' />
            </div>

            {/* course category */}
            <div className='flex flex-col'>
                <label htmlFor="category" className=' font-medium text-sm' >Category<sup className="text-[#f00]">*</sup></label>
                <select id="category" className='bg-richblack-700 rounded-md shadow-[0_1px_rgba(255,255,252,0.3)] focus:outline-none p-2 text-sm' {...register("category", {
                    required: true,
                })}
                    defaultValue=""
                >
                    {/* write options */}
                    <option value="" disabled>--Choose the category--</option>
                    {!loading && courseCategories.map((category, index) => (
                        <option key={index} value={category._id}>{category.name}</option>
                    ))
                    }
                </select>
            </div>

            {/* course Tags */}
            <div className='flex flex-col'>
                <label htmlFor="courseTag" className=' font-medium text-sm'>Tags<sup className="text-[#f00]">*</sup></label>


                {/* map Tags */}
                {tag.length > 0 && <div className='m-2 flex flex-wrap gap-2'>
                    {tag.map((item, index) => (
                        <div key={index} className='border p-1 rounded-md flex items-center gap-2'>{item} <div onClick={() => {
                            setTags(
                                tag.filter((item, ind) =>
                                    ind !== index
                                )
                            );
                        }} ><RxCross2 /></div></div>
                    ))}
                </div>
                }
                <input type="text" id="courseTag" className='bg-richblack-700 rounded-md shadow-[0_1px_rgba(255,255,252,0.3)] focus:outline-none p-3 text-sm' placeholder='Choose a Tag' onKeyDown={(e) => {

                    if (e.key === "Enter" || e.key === ",") {
                        e.preventDefault();
                        const chip = e.target.value.trim();
                        if (chip && !tag.includes(chip)) {
                            setTags([...tag, chip]);
                            e.target.value = "";
                        }
                    }
                }} />
            </div>
            {/* Course Thumbnail */}
            <DropZone 
            video={video}
            setThumbnail={setThumbnail} 
            setPreviewSource={setPreviewSource} 
            previewSource={previewSource} 
            label={"Course Thumbnail"}
             />

            {/* Benefits */}
            <div className='flex flex-col'>
                <label htmlFor="whatYouWillLearn" className=' font-medium text-sm' >Benefits of the Course<sup className="text-[#f00]">*</sup></label>
                <textarea rows='5' id="whatYouWillLearn" className='bg-richblack-700 rounded-md shadow-[0_1px_rgba(255,255,252,0.3)] focus:outline-none p-3 text-sm' placeholder='Enter Benefits of the course' {...register("whatYouWillLearn", { required: true })}></textarea>
            </div>


            {/* Requirements/Instructions */}
            <div className='flex flex-col'>
                <label htmlFor="courseRequirements" className=' font-medium text-sm'>Requirements/Instructions<sup className="text-[#f00]">*</sup></label>
                <input type="text" id="courseRequirements" className='bg-richblack-700 rounded-md shadow-[0_1px_rgba(255,255,252,0.3)] focus:outline-none p-3 text-sm' placeholder='Enter Benefits of the course' ref={req} />
                <div className='text-yellow-200 cursor-pointer' onClick={() => {
                    setRequirements([...requirements, req.current.value]);
                    req.current.value = "";
                }} >Add</div>

                <div className='flex flex-col gap-1'>
                    {/* requirments map */}
                    {
                        requirements.map((item, index) =>
                            <div className='flex items-center gap-2 border w-fit bg-richblack-600 text-sm font-medium' key={index}>{item} <RxCross2 onClick={() => {
                                setRequirements(requirements.filter((item, ind) => {
                                    return ind !== index;
                                }))
                            }} /></div>
                        )
                    }
                </div>
            </div>
            {/* buttons */}
            <div className='justify-self-end flex gap-3 text-sm w-fit'>
                {editCourse && 
                 <div className='flex gap-4'>
                 <button className=' w-fit bg-yellow-50 border rounded-md py-3  px-6 border-richblack-400 text-black flex items-center gap-1 text-sm'  onClick={
                     () =>
                     {  reset();
                        dispatch(resetCourseState());
                         setRequirements([]);
                         setTags([]);
                      setPreviewSource(null);
                      setThumbnail(null);
                     }
                   }><GrAddCircle/>New</button>
                <button className='bg-richblack-700 border rounded-md p-1 border-richblack-400' onClick={
                    () => {
                        dispatch(setStep(2));
                    }
                }>Continue Without Edit</button>
                </div>}
     
                <button type="submit" className='bg-yellow-100 border rounded-md p-1 border-richblack-400 text-black'>{editCourse ? "Save Changes" : "Save"}</button>
            </div>
        </form>
    )
}
export default CIForm

/* "{"price":"264","category":"6474439f5a016506e3b3ec24","courseName":"Maia Madden","courseDescription":"Dolor veniam harum ","instructions":"[\"Sed qui in debitis v\"]","tag":"[\"Quia doloremque susc\"]","status":"DRAFT","whatWillYouLearn":"Quidem lorem porro i","thumbnailImage":{"path":"Screenshot (18).png"}}" */