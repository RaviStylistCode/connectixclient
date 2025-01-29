import { createSlice } from "@reduxjs/toolkit";

const socketslice=createSlice({
    name:"socket",
    initialState:{
        Socket:null,
        onlineUsers:[],
        messages:[]
    },
    reducers:{

        setSocket:(state,action)=>{
            state.Socket=action.payload;
        },

        setOnlineUsers:(state,action)=>{
            state.onlineUsers=action.payload;
        },

        setMessages:(state,action)=>{
            state.messages=action.payload;
        }
    }
});

export const {setSocket,setOnlineUsers,setMessages}=socketslice.actions;
export default socketslice.reducer;