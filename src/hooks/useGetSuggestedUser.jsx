import { apiserver } from '@/main';
import { setSuggestedUser } from '@/redux/AuthSlice';
import axios from 'axios';
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';

const useGetSuggestedUser = () => {
    const dispatch=useDispatch();
  useEffect(()=>{

    const fetchSuggestedUser=async()=>{
        try {
            const res=await axios.get(`${apiserver}/users/suggest/user`,{withCredentials:true});
            if(res.data.success){
                // console.log(res.data)
                dispatch(setSuggestedUser(res.data.user));
            }
        } catch (error) {
            // console.log(error);
        }
    }
    fetchSuggestedUser();
  },[]);
}

export default useGetSuggestedUser