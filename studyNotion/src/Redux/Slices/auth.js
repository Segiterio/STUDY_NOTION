//auth slice

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    loading:false,
    token:localStorage.getItem("token") ? JSON.parse(localStorage.getItem("token")) : null,
    userDetails:null,
}

const authSlice = createSlice({
    name:"auth",
    initialState,
    reducers:{
        setauth(state,action)
        {   
            localStorage.setItem("token",JSON.stringify(action.payload));
            state.token = action.payload;
        },
        setUserDetails(state,action)
        {
            state.userDetails = action.payload;
            console.log("user detail in setUserDetails auth.js",state.userDetails);
        },
        setLoading(state,action){
             state.loading = action.payload;
        }
    }
})

export const {setauth,setUserDetails,setLoading} = authSlice.actions;

export default authSlice.reducer;