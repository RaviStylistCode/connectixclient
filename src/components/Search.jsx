import React, { useState } from 'react'
import { Button } from './ui/button'
import toast from 'react-hot-toast';
import axios from 'axios';
import { apiserver } from '@/main';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Link } from 'react-router-dom';

const Search = () => {

    const [input,setInput]=useState('');
    const [data,setData]=useState([]);

    const searchhandler=async()=>{
        try {
            const res=await axios.get(`${apiserver}/users/search/${input}`,{withCredentials:true});
            if(res.data.success){
                toast.success(res.data.message);
                setData(res.data.user)
                // console.log(res.data);
            }
            
        } catch (error) {
            // console.log(error)
            toast.error(error.response.data.message);
        }
    }

  return (
    <div className='ml-[20%] my-5'>
        <h3 className='text-2xl font-bold mb-5'>Search People Here...</h3>
        <div className='flex gap-3'>
            <input type="text" 
            name='search' 
            onChange={(e)=>setInput(e.target.value)}
            value={input}
            placeholder='Search people you want...' 
            className='p-4 w-1/2 outline-none rounded-lg'
            />
            <Button className=' p-8' onClick={searchhandler}>Search</Button>
        </div>

        <div className='w-full my-4 '>

            {
                data && data.map((d)=>{
                    return(

            <div className='flex gap-10 items-center w-1/2 my-5 justify-left' key={d._id}>
                <div className='flex gap-3 items-center '>
                    <Avatar className='w-32 h-32'>
                        <AvatarImage  src={d?.image} alt='img'/>
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>

                     <div className='flex flex-col '>
                    <span className='font-bold text-xl'>{d.username}</span>
                        <span className='font-bold text-xl'>{d.bio}</span>
                        </div>   
                </div>

                <div className='flex gap-5'>
                    <Button>Message</Button>
                    <Link to={`/profile/${d._id}`}>
                    <Button>Profile</Button>
                    </Link>
                </div>

            </div>
                    )
                })
            }


        </div>

    </div>
  )
}

export default Search