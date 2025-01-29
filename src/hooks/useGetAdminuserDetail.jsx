import { apiserver } from '@/main';
import { setUserandPost } from '@/redux/adminSlice';
import axios from 'axios';
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';

const useGetAdminuserDetail = () => {

    const dispatch=useDispatch();
    const fetchdetail=async()=>{
        
        try {
            const res=await axios.get(`${apiserver}/users/admin/userdetail`,{withCredentials:true});
            if(res.data.success){
                // console.log(res.data);
                dispatch(setUserandPost(res.data.alldata));
            }
        } catch (error) {
            // console.log(error);
        }
    }
 
    useEffect(()=>{
        fetchdetail();
    },[]);
}

export default useGetAdminuserDetail