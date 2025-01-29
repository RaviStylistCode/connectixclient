import { createSlice } from "@reduxjs/toolkit";

const adminslice=createSlice({
    name:"admin",
    initialState:{
        userandpost:null
    },

    reducers:{
        setUserandPost:(state,action)=>{
            state.userandpost=action.payload;
        }
    }
});

export const {setUserandPost}=adminslice.actions;
export default adminslice.reducer;