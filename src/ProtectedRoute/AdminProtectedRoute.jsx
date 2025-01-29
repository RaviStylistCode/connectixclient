import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';

const AdminProtectedRoute = ({children}) => {
    const {user}=useSelector(store=>store.auth);
    const navigate=useNavigate();
    useEffect(()=>{
        if(!user){
            navigate("/login");
        }
        if(user?.role !== 'admin'){
            navigate("/");
        }
    },[])
  return <>{children}</>
}

export default AdminProtectedRoute