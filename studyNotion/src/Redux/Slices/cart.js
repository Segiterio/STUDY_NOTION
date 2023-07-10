import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    cart : localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")):[],
    total: localStorage.getItem("total") ?localStorage.getItem("total"):0,
    totalItem: localStorage.getItem("totalItem") ? localStorage.getItem("totalItem"):0,
}
const cartSlice = createSlice({
    name:"cart",
    initialState,
    reducers:{
        AddToCart(state,action){
            state.cart.push(action.payload);
            state.totalItem = state.totalItem + 1;
            state.total += action.payload.price; 
            localStorage.setItem("cart",JSON.stringify(state.cart));
            localStorage.setItem("total",state.total);
            localStorage.setItem("totalItem",state.totalItem);
        },
        RemoveFromCart(state,action){
            //action.payload is id here, so no need to write action.payload.id
            console.log("Action id",action.payload)
            state.cart = state.cart.filter((item) => item._id != action.payload._id);
            state.totalItem = state.totalItem - 1;
            state.total = state.total - action.payload.price;
            localStorage.setItem("cart",JSON.stringify(state.cart));
            localStorage.setItem("total",state.total);
            localStorage.setItem("totalItem",state.totalItem);
            
        },
        ResetCart(state,action)
        {
             state.cart = null;
             state.total = 0;
             state.totalItem = 0;
             localStorage.removeItem("cart");
             localStorage.removeItem("total");
             localStorage.removeItem("totalItem");
        }
    }
})

export const {ResetCart,AddToCart,RemoveFromCart} = cartSlice.actions;
export default cartSlice.reducer;