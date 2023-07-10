import { apiConnector } from "../axios/instance";
import { coursePoints,sectionPoints } from "../axios/services/apis";
import { toast } from "react-toastify";
import { setCourse,setLoading} from "../Redux/Slices/course";
import { setEditSectionName,setSectionName } from "../Redux/Slices/section";

export const getCourseCategories = async() =>
{
     try{ 
        const response = await apiConnector("GET",coursePoints.GET_COURSE_CATEGORIES);
      //   console.log("response in category" , response);
        return response.data.data;
     }catch(error)
     {
         console.log("error in category fetching", error);
     }
}

export const addNewSectionFun = async(data,token,course,dispatch,editSectionName,sectionName,setValue) =>{
   const toastId = toast.loading("Please wait ...")
   data.courseId = course._id;
   try {
     let response;
     if (editSectionName) {
       if (sectionName != data.sectionName) {
         response = await apiConnector("POST",sectionPoints.UPDATE_SECTION, data, {
           Authorization: `Bearer ${token}`
         })
         dispatch(setCourse(response.data.data))
       }
       else {
         toast.dismiss(toastId);
         toast.error("No changes made");
         return
       }
     }
     else {
       response = await apiConnector("POST", sectionPoints.CREATE_SECTION, data, {
         Authorization: `Bearer ${token}`
       })
       dispatch(setCourse(response.data.updatedCourse))
     }
     console.log("section response", response);
     dispatch(setSectionName(data.sectionName));
     setValue("sectionName", "");
     toast.dismiss(toastId);
     if (editSectionName) {
       dispatch(setEditSectionName(false));
     }
     toast.success(response.data.message);
   }
   catch (error) {
     toast.dismiss(toastId);
     toast.error("Could not update section name");
     console.log("errror in section ", error);

   }
}

export const getInstructorCourses = async(dispatch,token) =>
{  let courses;
   dispatch(setLoading(true));
   try{
      const response = await apiConnector("GET",coursePoints.GET_INSTRUCTOR_COURSES,null,{
         Authorization : `Bearer ${token}`
      });
      console.log("response in instructor course", response)
      dispatch(setLoading(false));
       courses = response.data.data;
   }catch(error)
     {
      dispatch(setLoading(false));
      courses = error?.response?.data?.message
      console.log("error",error)
   }
  return courses;
}

export const deleteCourse = async (courseId) => {
  console.log("delete course " , courseId);
 const toastId = toast.loading("Deleting Course")
    try{
       const response = await apiConnector("POST",coursePoints.DELETE_COURSE_API ,{courseId});
       console.log("resposne of Delete course",response);
       toast.dismiss(toastId);
       toast.success(response.data.message);
    }
    catch(error)
    {
       console.log(error.response.data.message);
       toast.dismiss(toastId);
       toast.error(error.response.data.message);
    }
}