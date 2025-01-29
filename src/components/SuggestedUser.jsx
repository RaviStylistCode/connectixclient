import { Link } from 'react-router-dom';
import React from 'react'
import { useSelector } from 'react-redux'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import axios from 'axios';
import { apiserver } from '@/main';
import toast from 'react-hot-toast';


const SuggestedUser = () => {
    const {suggestedUser,user}=useSelector(store=>store.auth);

    const followandunfollowhandler=async(id)=>{
        try {
          const res=await axios.get(`${apiserver}/users/follow/${id}`,{withCredentials:true});
          if(res.data.success){
            toast.success(`${res.data.message}`); 
          }
        } catch (error) {
          toast.error(error.response.data.message);
        }
      }

  return (
    <div className='my-4'>
        <div className='flex justify-center items-center gap-4 text-sm'>
            <h3 className='text-gray-500 cursor-pointer'>Suggested User</h3>
            <span className='text-black cursor-pointer '>See All</span>
        </div>
        {
            suggestedUser.map((userdata)=>{
                return(
                    <div key={userdata._id} className='flex gap-2 justify-evenly items-center text-sm font-semibold my-3'>
                        <Link to={`profile/${userdata?._id}`}>
                        <div className='flex gap-2 justify-center items-center'>

                            <Link>
                            <Avatar>
                                <AvatarImage src={userdata?.image} alt="image"/>
                                <AvatarFallback>CN</AvatarFallback>
                            </Avatar>
                            </Link>

                            <div>
                                <h3>{userdata?.username}</h3>
                                <span>{userdata?.bio || 'bio here...'}</span>
                            </div>

                        </div>
                        </Link>
                        <span className='text-cyan-400 hover:text-cyan-600 cursor-pointer text-sm' onClick={()=>followandunfollowhandler(userdata?._id)}>follow</span>

                    </div>
                )
            })
        }
    </div>
  )
}

export default SuggestedUser