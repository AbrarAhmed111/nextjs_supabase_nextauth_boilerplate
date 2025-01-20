// store.js
import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import  sampleReducer  from "./sample/SampleSlice";



const rootReducer = combineReducers({
      sampleData : sampleReducer
});

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== "production",
});

export default store;
