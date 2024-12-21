import { configureStore } from "@reduxjs/toolkit";
import { whishlistReducer } from "./wishlistSlice";

 export const myStore = configureStore({
    reducer:{
        whishlistReducer,
    }
 })