import { createSlice } from "@reduxjs/toolkit";

const rtnSlice=createSlice({
    name:"realtimenotification",
    initialState:{
        likenotification:[],
        likenotification1:[]
    },

    reducers:{

        setLikenotification:(state,action)=>{
            if(action.payload.type === 'like'){
                state.likenotification.push(action.payload);
                state.likenotification1.push(action.payload);
            }else if(action.payload.type === 'dislike'){
                state.likenotification=state.likenotification.filter((item)=>item.userId !== action.payload.userId);
                state.likenotification1=state.likenotification.filter((item)=>item.userId !== action.payload.userId);
            }
        },

        setClearnotification:(state,action)=>{
            state.likenotification=[];
        }
    }
});

export const {setLikenotification,setClearnotification}=rtnSlice.actions;
export default rtnSlice.reducer;