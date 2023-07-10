import { createSlice} from "@reduxjs/toolkit";

const initialState = localStorage.getItem("User_SN") ? JSON.parse(localStorage.getItem("User_SN")) : null;

const userSlice  = createSlice({
    name:"profile",
    initialState,
    reducers:{
        setProfile(state,action)
        {  
           console.log("action.payload", action.payload);
           localStorage.setItem("User_SN", JSON.stringify(action.payload));
           return state = action.payload;
        }
    }
})

export const {setProfile} = userSlice.actions;
export default userSlice.reducer;

//akashkumar0204625@outlook.com