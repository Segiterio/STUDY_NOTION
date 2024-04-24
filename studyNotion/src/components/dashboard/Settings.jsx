import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import Codes from "../../data/countrycode.json";
import Profession from "../../data/profession.json";
import { apiConnector } from '../../axios/instance';
import { profilePointes } from '../../axios/services/apis';
import { useDispatch } from 'react-redux';
import { setProfile } from "../../Redux/Slices/user"
import { profileUpdate } from '../../Functions/Userfun';
import { toast } from 'react-toastify';
import { GetAllDetailsUser } from '../../Functions/Userfun';
import PasswordUpdate from './Features/PasswordUpdate';
import DeleteAccount from './Features/DeleteAccount';
import {BsUpload} from "react-icons/bs"
const Settings = () => {
  const {token} = useSelector(state => state.auth)
  const user = useSelector(state => state.profile);
  const dispatch = useDispatch();
  const [imageFile, setImageFile] = useState(null)
  const [previewSource, setPreviewSource] = useState(null)
  const [upload, setUpload] = useState("Upload");

  const [profileForm, setProfileform] = useState({
    displayName: "",
    dateOfBirth: "",
    contactNumber: "",
    gender: "",
    countryCode: "",
    profession: "",
    about:"",
  });
  function handleProfileOnChange(e) {
    const { name, value } = e.target;

    setProfileform({
      ...profileForm, [name]: value
    })
      ;

  }
 // console.log(profileForm);
  function handleFileChange(e) {
    const file = e.target.files[0]
    console.log("file", file);
    // console.log(file)
    if (file) {
      setImageFile(file)
      previewFile(file)
    }
  }
  
  const previewFile = (file) => {
    const reader = new FileReader()
    console.log("reader", reader);
    reader.readAsDataURL(file)
    reader.onloadend = () => {
      setPreviewSource(reader.result)
    }
  }

  return (
    <div className='flex flex-col gap-4 my-5 max-w-[1000px] mx-auto'>
      <h2 className='text-3xl font-semibold text-richblack-5'>Edit Profile</h2>
      <div className='flex bg-richblack-800 gap-5 p-4 rounded-lg border border-richblack-700 '>
        <img src={previewSource || user?.image} alt={`profile img`} className=' w-16 h-16 rounded-full object-cover' loading='lazy' />
        <div className='flex flex-col justify-evenly'>
          <p className='text-richblack-5'>Change Profile Picture</p>
          <form className='flex gap-2' autoComplete='on' onSubmit={async (e) => {
            e.preventDefault();
            try {
              setUpload("Uploading...")
              const formData = new FormData();
              formData.append("displayPicture", imageFile)
              console.log("formdtaa of image", formData);
              const response = await apiConnector("PUT", profilePointes.UPDATE_Display_Picture,formData,{
                Authorization:`Bearer ${token}`
              })

              dispatch(setProfile(response.data.data));
              console.log("image response", response);
              setUpload("Upload")
            } catch (error) {
              console.log("image errro ", error);
              setUpload("Upload")
            }
          }}>
            <label htmlFor="fileSelect" className='bg-yellow-50 flex items-center text-black px-2 py-1 rounded-md cursor-pointer active:scale-95 text-sm'>Choose</label>
            <input type="file" id="fileSelect" accept='image/*' className='hidden' onChange={handleFileChange} />
            <button type="submit" className='bg-richblack-600 flex items-center text-black px-2 py-1  rounded-md cursor-pointer active:scale-95 text-sm'><BsUpload/> {" "+upload}</button>
          </form>
        </div>
      </div>

      <div className='bg-richblack-800 border border-richblack-700 p-4 rounded-lg'>
        <h2 className='text-richblack-5'>Profile Information</h2>
        <form className='grid grid-cols-2 grid-rows-3 gap-3 text-sm text-richblack-5 mt-3'
          onSubmit={ (e) => {
            toast.success("Request send")
            e.preventDefault()
             profileUpdate(profileForm,token);
             GetAllDetailsUser(dispatch,token);
            // console.log(profileForm)
            toast.success("Request end");
          }}>
          <div className='flex flex-col'><label htmlFor="displayName">Display Name</label><input type="text" id="displayName" name="displayName" value={profileForm.displayName} onChange={handleProfileOnChange} className='bg-richblack-700 rounded-md placeholder:text-richblack-200 p-2 focus:outline-none shadow-[-1px_-1px_inset_rgba(255,255,250,0.1)]' />
            <p className='text-[12px] font-thin '>Name entered above will be used for all issued certifies.</p>
          </div>

          <div className='flex flex-col'><label htmlFor="profession">Profession</label><select name="profession" id="profession" className='bg-richblack-700 rounded-md placeholder:text-richblack-200 p-2 focus:outline-none shadow-[-1px_-1px_inset_rgba(255,255,250,0.1)]' value={profileForm.profession} onChange={handleProfileOnChange}  >
            {
              Profession.map((profession, index) =>
                <option key={index} value={profession.name}>{profession.name}</option>)
            }
          </select>
          </div>

          <div className='flex flex-col'>
          <label htmlFor="dateOfBirth">Date of Birth</label>
          <input type="date" name="dateOfBirth" id="dateOfBirth" value={profileForm.dateOfBirth} className='bg-richblack-700 rounded-md placeholder:text-richblack-200 p-2 focus:outline-none shadow-[-1px_-1px_inset_rgba(255,255,250,0.1)]' onChange={handleProfileOnChange} /></div>


          <div className=''>
            <p>Gender</p>
            <div className='flex gap-3 m-2'>
              <div>
                <input type="radio" name="gender" id="male" value="Male" onChange={handleProfileOnChange} /><label htmlFor="male"  > Male</label>
              </div>

              <div>
                <input type="radio" name="gender" id="Female" value="Female" onChange={handleProfileOnChange} /> <label htmlFor="Female" >Female</label>
              </div>

              <div>
                <input type="radio" name="gender" id="other" value="Other" onChange={handleProfileOnChange} /> <label htmlFor="other">Other</label>
              </div>

            </div>
          </div>

          <div ><label htmlFor="phone">Phone Number</label>
            <div className='flex gap-3 w-full'><select id="phone" name="countryCode" onChange={handleProfileOnChange} className='bg-richblack-700 rounded-md placeholder:text-richblack-200 p-2 focus:outline-none shadow-[-1px_-1px_inset_rgba(255,255,250,0.1)] w-1/3'>
              {
                Codes.map((code, index) =>
                (
                  <option value={code.code} key={index} className='bg-richblack-700 rounded-md placeholder:text-richblack-200 p-2 focus:outline-none shadow-[-1px_-1px_inset_rgba(255,255,250,0.1)]' >{code.country}</option>
                )

                )
              }
            </select>
            <input type="tel" name="contactNumber" id="contactNumber" value={profileForm.contactNumber} onChange={handleProfileOnChange} placeholder='12345 67890' className='bg-richblack-700 rounded-md placeholder:text-richblack-200 p-2 focus:outline-none shadow-[-1px_-1px_inset_rgba(255,255,250,0.1)]' /></div></div>

          <div className='flex flex-col'>
          <label htmlFor="about">about</label>
          <input type="text" className='bg-richblack-700 rounded-md placeholder:text-richblack-200 p-2 focus:outline-none shadow-[-1px_-1px_inset_rgba(255,255,250,0.1)]' name="about" id="about" value={profileForm.about} onChange={handleProfileOnChange} /></div>

          <div className='col-span-2 justify-self-end flex gap-3'>
            <button className='bg-richblack-600 flex items-center text-black px-2 py-1  rounded-md cursor-pointer active:scale-95 text-sm'>Cancel</button>
            <button className='bg-yellow-50 flex items-center text-black px-2 py-1 rounded-md cursor-pointer active:scale-95 appearance-none text-sm'>Save</button>
          </div>
        </form>
      </div>

      {/* password update */}
      <PasswordUpdate token={token}/>
      {/* delete account */}
      <DeleteAccount />
    </div>
  )
}

export default Settings