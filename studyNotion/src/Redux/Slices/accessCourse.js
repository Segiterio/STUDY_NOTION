import { createSlice } from "@reduxjs/toolkit";

const initialState = { 
      courseContent:[],
      videoUrl:null,
      sectionData:null,
}
 
const accessCourseSlice = createSlice({
     name:"accessCourse",
     initialState,
     reducers:{
         setAccessCourseData(state,action){
             state.courseContent=  action.payload;
           },
         setCurrentVideo(state,action){
             state.videoUrl = action.payload;
         },
         setSectionId(state,action) {
             state.sectionData = action.payload
         }
     }
})

export const {setAccessCourseData,setCurrentVideo,setSectionId} = accessCourseSlice.actions;

export default accessCourseSlice.reducer;