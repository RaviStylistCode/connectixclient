import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

const AdminPosts = () => {
  const [post,setPost]=useState([]);
  const {userandpost}=useSelector(store=>store.admin);

  useEffect(()=>{
    if(userandpost?.post){
      setPost(userandpost?.post);
    }
  },[]);
  return (
    <div className='ml-[20%] my-5'>
      <h3 className='font-bold text-gray-400 underline ml-3'>Posts</h3>

      <div className='bg-white p-4 grid grid-cols-2 gap-2 '>
        {
          post && post?.map((item)=>{
            return(
              <div className=' bg-blue-300 p-3 w-3/2 rounded-lg '>
                <div className='flex gap-3 items-center border-b-4 border-rose-600 py-1'>
                  <Avatar className='w-24 h-24'>
                    <AvatarImage src={item?.owner?.image} alt='img'/>
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                  <span className='text-2xl font-bold'>{item?.owner?.username}</span>
                </div>
                <div className='my-1'>

                <img src={item?.url} className='object-cover aspect-square rounded-lg w-full h-64' alt='img'/>
                </div>

              </div>
            )
          })
        }
      </div>

    </div>
  )
}

export default AdminPosts