import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./Slices/auth"
import profileReducer from "./Slices/user"
import cartReducer from "./Slices/cart"
import courseReducer from "./Slices/course"
import sectionReducer from "./Slices/section"
import subSectionReducer from "./Slices/subsection"

export const store = configureStore({
    reducer:{
         auth:authReducer,
         profile:profileReducer,
         cart:cartReducer,
         course:courseReducer,
         section:sectionReducer,
         subSection:subSectionReducer,
    },
})