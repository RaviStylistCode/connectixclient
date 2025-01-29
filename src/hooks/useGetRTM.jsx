import { setMessages } from "@/redux/socketSlice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"


const useGetRTM = () => {
  const dispatch=useDispatch();
  const {Socket,messages}=useSelector(store=>store.socket);

  useEffect(()=>{
    Socket?.on("newMessage",(newMessage)=>{
        dispatch(setMessages([...messages,newMessage]));
    })

    return ()=>{
        Socket?.off("newMessage");
    }
  },[messages,setMessages])
}

export default useGetRTM