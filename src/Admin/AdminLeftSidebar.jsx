
import { apiserver } from '@/main'
import { setAuthUser } from '@/redux/AuthSlice'
import axios from 'axios'
import { Home, LoaderPinwheel, LogOut, Users } from 'lucide-react'
import React from 'react'
import toast from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const AdminLeftSidebar = () => {
    const navigate=useNavigate();
    const dispatch=useDispatch();
    const {user}=useSelector(store=>store.auth);

     const logouthandler = async () => {
        try {
          const res = await axios.get(`${apiserver}/users/logout`, {
            withCredentials: true,
          });
          if (res.data.success) {
            dispatch(setAuthUser(null));
            navigate("/login");
            toast.success(res.data.message);
          }
        } catch (error) {
          toast.error(error.response.data.message);
        }
      };
    const sidebarmenu=[
        {icon:<Home/>,text:"Home"},
        {icon:<Users/>,text:"Users"},
        {icon:<LoaderPinwheel/>,text:"Posts"},
        // {icon:(
        //     <Avatar className='w-7 h-7'>
        //         <AvatarImage src='' alt='img'/>
        //         <AvatarFallback>CN</AvatarFallback>
        //     </Avatar>
        // ),text:"Profile"},
        {icon:<LogOut/>,text:"Logout"}
    ];


    const sidebarhandler=(textType)=>{
        if(textType === 'Home'){
            navigate("/admin/main");
        }else if(textType === "Profile"){
            navigate("/admin/main/profile")
        }else if(textType === "Users"){
            navigate("/admin/main/users")
        }else if(textType === "Posts"){
            navigate("/admin/main/posts")
        }else if(textType === 'Logout'){
            logouthandler();
        }
    }
  return (
    <div className='fixed top-0  z-10  w-[17%] h-screen   overflow-y-scroll'>
        <div className=' p-2  flex flex-col items-center mx-auto my-5 justify-center'>
            <h1>Hi {user?.username}</h1>
            <div>
                {
                    sidebarmenu?.map((item)=>{
                        return(
                            <div key={item.text} onClick={()=>sidebarhandler(item.text)} className='flex gap-2 my-5 hover:bg-gray-200 p-4 cursor-pointer rounded-lg'>
                                {item?.icon}
                                <span className='font-semibold hidden md:block '>{item?.text}</span>
                            </div>
                        )
                    })
                }
            </div>
        </div>
        
        </div>
  )
}

export default AdminLeftSidebar