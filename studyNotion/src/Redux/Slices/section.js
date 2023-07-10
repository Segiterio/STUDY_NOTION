import { createSlice } from "@reduxjs/toolkit";

const initialState = {
   
    sectionName:null,
    editSectionName:false,
    sectionId:null,

}
const sectionSlice = createSlice({
    name:"section",
    initialState,
    reducers:{
        setSectionName(state,action)
        {
             state.sectionName = action.payload;
        },
        setEditSectionName(state,action)
        {
            state.editSectionName = action.payload;
        }, 
        setSectionId(state,action)
        { 
            state.sectionId = action.payload
        }
    }
})

export const {setSectionName,setEditSectionName,setSectionId} = sectionSlice.actions;
export default sectionSlice.reducer;