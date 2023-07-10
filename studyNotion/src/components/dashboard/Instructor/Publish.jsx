import React,{useState} from 'react'
import { apiConnector } from '../../../axios/instance'
import { coursePoints } from '../../../axios/services/apis'
import { STATUS_TYPE } from "../../../Constants/Constant"
import { useDispatch, useSelector } from 'react-redux'
import { resetCourseState, setStep } from '../../../Redux/Slices/course'
import { toast } from 'react-toastify'

const Publish = () => {
  const dispatch = useDispatch();
  const { token } = useSelector(state => state.auth);
  const { course } = useSelector(state => state.course);
  const [status, setStatus] = useState(false)
  console.log("status",status)
    return (
    <div className='text-white p-4 bg-richblack-800 rounded-md mr-4' >
      <h2>Publish Settings</h2>
      <form onSubmit={async(e) => {
        e.preventDefault();
        try {
          if(status)// if status is publish
          {
            const response = await apiConnector("POST", coursePoints.MAKE_STATUS, {
              Publish: STATUS_TYPE.PUBLISH,
              courseId: course._id
            }, {
                Authorization: `Bearer ${token}`
              });
            console.log("response of Status", response);
            toast.success("Course publised")
           
//make course slice null
          }
          else {
            toast.success("Course Save as Draft");
          }    
          setTimeout(() => dispatch(resetCourseState()),1000);
        }
        catch (error) {
          console.log("error in status", error);
          toast.error(error.response.message);
        }
      }}>
      <div className='flex items-center gap-2 mt-5'>
        <input type="checkbox" className="w-5 h-5" name="status" id="status" onChange={() => {setStatus(!status)
       }
        } />
        <label htmlFor="status" className='text-sm text-richblack-200 font-normal'>Make this course Public</label>
        </div>


        <div className='flex justify-between mt-5'>
          <button className='bg-richblack-700 border rounded-md p-1 border-richblack-400' onClick={() =>
          {
             dispatch(setStep(2));
          }}>Back</button>
            <button type="submit" className='bg-yellow-100 border rounded-md p-1 border-richblack-400 text-black' >Next</button>
        </div>

      </form>
    </div>
  )
}

export default Publish