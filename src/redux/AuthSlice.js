import { createSlice } from "@reduxjs/toolkit";

const authslice=createSlice({
    name:'auth',
    initialState:{
        user:null,
        selectedUser:null,
        suggestedUser:[],
        userprofile:null,
        
        
    },

    reducers:{
        setAuthUser:(state,action)=>{
            state.user=action.payload;
        },

        setSuggestedUser:(state,action)=>{
            state.suggestedUser=action.payload;
        },

        setUserprofile:(state,action)=>{
            state.userprofile=action.payload;
        },

        setSelectedUser:(state,action)=>{
            state.selectedUser=action.payload;
        },

        setFollowandunfollow:(state,action)=>{
            
        }


        
    }
});

export const {setAuthUser,setSuggestedUser,setUserprofile,setSelectedUser}=authslice.actions;
export default authslice.reducer;