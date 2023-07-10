import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setEditCourse, setStep } from '../../../Redux/Slices/course';
import { useForm } from 'react-hook-form';
import { AiOutlinePlusCircle, AiFillCaretDown } from "react-icons/ai"
import { setSectionName, setEditSectionName, setSectionId } from '../../../Redux/Slices/section';
import {setSubSectionId } from '../../../Redux/Slices/subsection';
import { RxDropdownMenu } from 'react-icons/rx';
import { VscEdit } from 'react-icons/vsc';
import { RiDeleteBin5Line } from 'react-icons/ri';
import { MdAdd } from 'react-icons/md';
import { toast } from 'react-toastify';
import CreateSubSection from './CreateSubSection';
import { addNewSectionFun } from '../../../Functions/Instructorfun';
//import { addNewSection } from '../../../Functions/Instructorfun';

const CBForm = () => {

    

  // make variable for storing subSection details
  const {course} = useSelector(state => state.course);
  const {token} = useSelector(state => state.auth);


  const { editSectionName, sectionName, sectionId } = useSelector(state => state.section)

  const [subSectionModal, setSubSectionModal] = useState(false);
  const [mode, setMode] = useState(null);


  const dispatch = useDispatch();
  const { register, formState: { errors }, setValue, handleSubmit } = useForm();
  console.log("course Slice", course);

  const addNewSection = async(data) => {

    addNewSectionFun(data,token,course,dispatch,editSectionName,sectionName,setValue);
    // const toastId = toast.loading("Please wait ...")
    // data.courseId = course._id;
    // try {
    //   let response;
    //   if (editSectionName) {
    //     if (sectionName != data.sectionName) {
    //       response = await apiConnector("POST", "http://localhost:4000/api/v1/course/updateSection", data, {
    //         Authorization: `Bearer ${token}`
    //       })
    //       dispatch(setCourse(response.data.data))
    //     }
    //     else {
    //       toast.dismiss(toastId);
    //       toast.error("No changes made");
    //       return
    //     }
    //   }
    //   else {
    //     response = await apiConnector("POST", "http://localhost:4000/api/v1/course/addSection", data, {
    //       Authorization: `Bearer ${token}`
    //     })
    //     dispatch(setCourse(response.data.updatedCourse))
    //   }
    //   console.log("section response", response);
    //   dispatch(setSectionName(data.sectionName));
    //   setValue("sectionName", "");
    //   toast.dismiss(toastId);
    //   if (editSectionName) {
    //     dispatch(setEditSectionName(false));
    //   }
    //   toast.success(response.data.message);
    // }
    // catch (error) {
    //   toast.dismiss(toastId);
    //   toast.error("Could not update section name");
    //   console.log("errror in section ", error);

    // }
  }

  const goBack = () => {
    dispatch(setEditCourse(true));
    dispatch(setStep(1));
  }

  const goToNext = () => {
    if (course.courseContent[0].subSection.length > 0)
      { 
        dispatch(setStep(3));
       return }
    else {
       toast.error("Please add 1 lecture atleast");
       return;
    }
  }

  // useEffect(() => { // if editSection name is true in Slice handle later
  // })

  return (
    <div className='text-white p-4 bg-richblack-800 rounded-md mr-4'>
      <div>Course Builder</div>
      <form onSubmit={handleSubmit(addNewSection)}>
        <input {...register("sectionName", { required: true })} className='bg-richblack-700 rounded-md  shadow-[0_1px_rgba(255,255,252,0.3)] focus:outline-none p-3 text-sm block w-full text-richblack-200' />
        <div className='flex gap-5 items-center'>
          <button type="submit" className='border p-1 mt-2 flex items-center rounded-md text-yellow-200 gap-1' >
            <AiOutlinePlusCircle className='text-xl' />{editSectionName ? "Edit Section Name" : "Create Section"}
          </button>

          {
            editSectionName && <button className='text-xs underline text-richblack-300' onClick={() => {
              dispatch(setEditSectionName(false));
              setValue("sectionName", "");
            }}>Cancel Edit</button>
          }
        </div>
      </form>

      {course.courseContent.length > 0 &&
        <div className='my-3 p-2 rounded-md bg-richblack-700'>{course.courseContent.map((section) => (
          <details key={section._id} open >
            <summary className='list-none'>
              <div className='flex justify-between border-b border-richblack-600 duration-1000 transition-all'>
                <div className='flex items-center gap-2'>
                  <RxDropdownMenu />
                  {section?.sectionName}
                </div>
                <div className='flex items-center gap-2'>
                  <VscEdit onClick={(e) => {
                    e.preventDefault();
                    if (!editSectionName)
                      dispatch(setEditSectionName(!editSectionName));
                    setValue("sectionId", section._id)
                    dispatch(setSectionName(section.sectionName))
                    setValue("sectionName", section.sectionName);
                  }} />
                  <RiDeleteBin5Line />
                  <div className='w-[1px] bg-richblack-300 h-full'></div>
                  <div className='downSign'>
                    <AiFillCaretDown  />
                  </div>
                </div>
              </div>
            </summary>

            {/* I think lecture jsx added here */}
            {
              section?.subSection.length > 0 && <div>
                {
                  section.subSection.map((subSection) =>
                  (<div className='border-b border-richblack-600' key={subSection._id}>
                    <div className='flex justify-between w-11/12 mx-auto'>

                      <div className='flex items-center gap-2'>
                        <RxDropdownMenu />
                        <p className='cursor-pointer' onClick={() =>
                        {
                           setMode(3);
                           dispatch(setSubSectionId(subSection._id))
                           setSubSectionModal(true);
                        }}>{subSection.title}</p>
                      </div>

                      <div className='flex items-center gap-2'>
                        <VscEdit onClick={
                          (e) => {
                            e.stopPropagation();
                            setMode(2);
                            dispatch(setSubSectionId(subSection._id))
                            setSubSectionModal(true);

                          }
                        } />
                        <RiDeleteBin5Line 
                           
                        />
                      </div>
                    </div>
                  </div>
                  ))
                }
              </div>
            }
            {/* handle its onClick */}
            <button className='text-yellow-100 flex items-center' onClick={(e) => {
              e.stopPropagation();
              setSubSectionModal(true)
              setMode(1)
              dispatch(setSectionId(section._id))
              console.log("section id ", section._id);

            }
            }><MdAdd />Add leture</button>
            {
              subSectionModal && <CreateSubSection setSubSectionModal={setSubSectionModal} mode={mode} sectionId={sectionId} course={course} />}
          </details>
        ))}
        </div>
      }
     <div className='flex gap-4 justify-between mt-3'>
        <button type="button" onClick={goBack} className='bg-richblack-700 border rounded-md p-1 border-richblack-400 '>Back</button>
       { course.courseContent.length> 0 &&  <button type='button' onClick={goToNext} className='bg-yellow-100 border rounded-md p-1 border-richblack-400 text-black'>Next</button> }
      </div> 
    </div>
  )
}

export default CBForm