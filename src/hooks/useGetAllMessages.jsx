import { apiserver } from "@/main";
import { setMessages } from "@/redux/socketSlice";
import axios from "axios";
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"


const useGetAllMessages = () => {
    const dispatch=useDispatch();
    const {selectedUser} =useSelector(store=>store.auth);
  

 useEffect(()=>{
    const fetchallMessage=async()=>{
        try {
            const res=await axios.get(`${apiserver}/messages/all/${selectedUser?._id}`,{withCredentials:true});
            // console.log(res.data);
            if(res.data.success){
                dispatch(setMessages(res.data.message));
            }
           
        } catch (error) {
            // console.log(error);
        }
    }

    fetchallMessage();
 },[selectedUser]);
}

export default useGetAllMessages