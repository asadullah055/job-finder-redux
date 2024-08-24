import { configureStore } from "@reduxjs/toolkit";
import jobsReducer from "../features/Jobs/jobsSlice";
import filterReducer from "../features/filters/filterSlice";


export const store = configureStore({
    reducer:{
       jobs: jobsReducer,
       filters: filterReducer
    }
})  