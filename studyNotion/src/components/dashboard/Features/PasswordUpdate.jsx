import React, { useState } from 'react'
import { ChangePassword } from '../../../Functions/Userfun';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
const PasswordUpdate = ({token}) => {

  const [passwords, setPasswords] = useState({
    oldPassword: "",
    newPassword: ""
  });
  const [oldEye, setOldEye] = useState(true);
  const [newEye, setNewEye] = useState(true);
  function onPasswordChange(e) {
    const { name, value } = e.target;
    setPasswords({ ...passwords, [name]: value })
  }
  // console.log(passwords);
  return (
    <div className='border border-richblack-700 bg-richblack-800 rounded-lg p-3'>

      <form className='flex flex-col gap-5 text-richblack-5' onSubmit={(e) => {
        e.preventDefault();
        ChangePassword(passwords, setPasswords,token);

      }
      }>
        <div className='flex gap-3'>

          <div className=''><label htmlFor="oldPassword">Old Password</label>
          <div className="relative">
                            <input type={oldEye ? "password" : "text"} name="oldPassword"
                                value={passwords.oldPassword} onChange={onPasswordChange} id="oldPassword" className="p-2 rounded-lg bg-richblack-700 text-richblack-200 focus:outline-none shadow-[-1px_-1px_inset_rgba(255,255,255,0.15)] w-full" placeholder="Enter password" />
                            <div className="absolute right-3 top-1/3">
                                {oldEye ? <AiFillEye className="text-richblack-300 text-xl" onClick={() => {
                                    setOldEye(false)
                                }} /> : <AiFillEyeInvisible className="text-richblack-300 text-xl" onClick={() => {
                                    setOldEye(true);
                                }} />}
                            </div>
                        </div>
          </div>

          <div className=''><label htmlFor="newPassword">New Password</label>
          <div className="relative">
                            <input type={newEye ? "password" : "text"} name="newPassword"
                                value={passwords.newPassword} onChange={onPasswordChange} id="newPassword" className="p-2 rounded-lg bg-richblack-700 text-richblack-200 focus:outline-none shadow-[-1px_-1px_inset_rgba(255,255,255,0.15)] w-full" placeholder="Enter password" />
                            <div className="absolute right-3 top-1/3">
                                {newEye ? <AiFillEye className="text-richblack-300 text-xl" onClick={() => {
                                    setNewEye(false)
                                }} /> : <AiFillEyeInvisible className="text-richblack-300 text-xl" onClick={() => {
                                    setNewEye(true);
                                }} />}
                            </div>
                        </div>
          </div>

        </div>

        <div className='flex gap-3 justify-end'>
          <button className='bg-richblack-600 flex items-center text-black px-2 py-1  rounded-md cursor-pointer active:scale-95 text-sm' >Cancel</button>
          <button className='bg-yellow-50 flex items-center text-black px-2 py-1 rounded-md cursor-pointer active:scale-95 appearance-none text-sm' type="submit" >Save</button>
        </div>
      </form>
    </div>
  )
}

export default PasswordUpdate