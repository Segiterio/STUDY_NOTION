import { createSlice } from "@reduxjs/toolkit";

const initialState = {
   
    
    subSectionId:null,

}
const subSectionSlice = createSlice({
    name:"subSection",
    initialState,
    reducers:{
        
        setSubSectionId(state,action)
        {
            state.subSectionId = action.payload;
        }
    }
})

export const {setSubSectionId} = subSectionSlice.actions;
export default subSectionSlice.reducer;