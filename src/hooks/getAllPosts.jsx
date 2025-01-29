import { apiserver } from "@/main";
import { AllPosts } from "@/redux/postSlice";
import axios from "axios";
import { useEffect } from "react"
import { useDispatch } from "react-redux"


const getAllPosts = () => {
    const dispatch=useDispatch();
  

 useEffect(()=>{
    const fetchall=async()=>{
        try {
            const res=await axios.get(`${apiserver}/posts/allpost`,{withCredentials:true});
            console.log(res.data);
            if(res.data.success){
                dispatch(AllPosts(res.data.post));
            }
           
        } catch (error) {
            // console.log(error);
        }
    }

    fetchall();
 },[]);
}

export default getAllPosts