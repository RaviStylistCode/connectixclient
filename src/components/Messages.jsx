import React, { useEffect, useState } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { Button } from './ui/button'
import { Link } from 'react-router-dom'
import useGetAllMessages from '@/hooks/useGetAllMessages'
import { useSelector } from 'react-redux'
import useGetRTM from '@/hooks/useGetRTM'

const Messages = ({selectedUser}) => {
    useGetRTM();
    useGetAllMessages();
    const {messages}=useSelector(store=>store.socket);
    const {user}=useSelector(store=>store.auth);
    const [message,setMessageshow]=useState([]);

  
  return (
    <div className='overflow-y-auto flex-1 p-4'>
        <div className='flex justify-center'>
            <div className='flex flex-col justify-center items-center'>
                <Avatar className='w-20 h-20'>
                    <AvatarImage src={selectedUser?.image} alt='profile'/>
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <span>{selectedUser?.username}</span>
                <Link to={`/profile/${selectedUser?._id}`}><Button className='h-8 my-2' variant="secondary">View Profile</Button></Link>
            </div>
        </div>

        <div className='flex flex-col gap-3'>
            {
              messages &&  messages.map((msg)=>(
                    <div key={msg._id} className={`flex ${msg.senderId === user?._id ? 'justify-end':'justify-start'}`}>
                        <div className={`p-2 rounded-lg max-w-xs ${msg.senderId === user?._id ? 'bg-blue-500' : 'bg-gray-300 text-black'}`}>

                        {msg.text}
                        </div>
                    </div>
                ))
            }
        </div>
    </div>
  )
}

export default Messages