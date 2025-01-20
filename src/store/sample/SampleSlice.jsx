import { createSlice } from "@reduxjs/toolkit";



const initialState = {
  error: null,
  isLoading: false,


};


export const sampleInformation = createSlice({
    name: "sampleInformation",
    initialState,
    reducers: {
      // Your synchronous reducers
    },
    extraReducers: (builder) => {
      builder
       
     
    },
  });
  
  export default sampleInformation.reducer;
  