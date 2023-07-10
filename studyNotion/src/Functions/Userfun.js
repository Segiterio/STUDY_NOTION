import { setProfile } from "../Redux/Slices/user";
import { setauth } from "../Redux/Slices/auth";
import { profilePointes,categories, coursePoints } from "../axios/services/apis";
import { endPoints } from "../axios/services/apis";
import { apiConnector } from "../axios/instance";
import {toast} from "react-toastify";

export const logOut = (dispatch,navigate) =>
          {  //set profile data null
             dispatch(setProfile(null))
             //set token null
             dispatch(setauth(null))
             localStorage.removeItem("token");
             localStorage.removeItem("User_SN");
             navigate("/login")
          }

export const profileUpdate = async(formData,token) =>
{ 
   try{
      const response = await apiConnector("PUT", profilePointes.UPDATE_PROFILE,formData,{
         Authorization : `Bearer ${token}`
      })
      console.log("UPDATE_PROFILE RESPONSE" , response)
   }catch(error){
     console.log("UPDATE_PROFILE Error", error)
   }
}

export const GetAllDetailsUser = async(dispatch,token) =>
{
    try{
        const response = await apiConnector("GET", endPoints.USER_DETAILS,null, {
         Authorization :`Bearer ${token}`
        });
        console.log("user Details" , response);
         dispatch(setProfile(response.data.data));
    }catch(error)
    {
         console.log("error in Get All Details",error);
    }
}

export const ChangePassword = async(passwords,setPasswords,token) =>
{  const toastId = toast.loading("Please wait...") 
   try{
      const response = await apiConnector("POST",endPoints.CHANGE_PASSWORD,passwords,{
         Authorization:`Bearer ${token}`
      });
      if(response.statusText !== "OK")
      {
        throw new Error ;
      }
      toast.dismiss(toastId);
      toast.success("Password changed")
      console.log("change password update",response);
      setPasswords({
         oldPassword:"",
         newPassword:""
      })
   }catch(error)
   {  toast.dismiss(toastId);
      toast.error("Password change failed")
      console.log("error in change password", error);
   }
}
//added by you 
export const CheckToken = async(dispatch,navigate,token)=> {
   try{
        const response = await apiConnector("GET",endPoints.CHECK_TOKEN,null, {
          Authorization:`Bearer ${token}`
        });
        console.log("Checktoken response",response);       
   }catch(error) 
   {   
       console.log("check token error",error);
       logOut(dispatch,navigate);
   }
}

export const GetUserEnrolledCourses = async(token) =>
{   const toastId = toast.loading("Geting Enrolled courses...")
    try{
         const resposne = await apiConnector("GET", profilePointes.GET_ENROLLED_COURSES,null,{
            Authorization:`Bearer ${token}`
         });
         console.log("GetUserEnrolledCouses response",resposne)
         toast.dismiss(toastId);
        return resposne.data.data;
     }catch(error)
    {
       console.log("GetUserEnrolledCourses error" , error)
       toast.dismiss(toastId);
       toast.error(error?.response?.message)
    }
}

export const getCategoryPageDetails = async(categoryId,setCourseData) =>
{
   try{
       const response = await apiConnector("POST",categories.GET_COURSE_BY_CATEGORY_ID, {categoryId})
       console.log("response of Course id",response)
       setCourseData(response.data.data);
   }
   catch(error)
    {
       console.log("error in course category by Id", error)
    }
 }

 export const getCourseDetails = async(courseId,setCourseIdData) =>
{
   try{
       const response = await apiConnector("POST",coursePoints.GET_COURSE_DETAILS, {courseId})
       console.log("response of Course id",response)
       setCourseIdData(response.data.data);
   }
   catch(error)
    {
       console.log("error in course category by Id", error)
    }
 }