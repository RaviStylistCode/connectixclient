import { apiserver } from "@/main";
import { setUserprofile } from "@/redux/AuthSlice";
import axios from "axios";
import { useEffect } from "react"
import { useDispatch } from "react-redux";


const useGetUserprofile = (userId) => {
  const dispatch=useDispatch();
    useEffect(()=>{
        const fetchUserprofile=async()=>{
            try {
                const res=await axios.get(`${apiserver}/users/${userId}`,{withCredentials:true});
                if(res.data.success){
                    // console.log(res.data);
                    dispatch(setUserprofile(res.data.user));
                }
            } catch (error) {
                console.log(error)
            }
        }

        fetchUserprofile();
    },[userId]);
}

export default useGetUserprofile