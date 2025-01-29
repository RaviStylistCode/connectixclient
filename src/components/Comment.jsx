import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'


const Comment = ({comment}) => {
  return (
    <div className='flex gap-5 my-3'>
        <div className='flex justify-center items-center gap-5'>
            <Avatar>
                <AvatarImage src={comment.author.image}/>
                <AvatarFallback>CN</AvatarFallback>
            </Avatar>

            <span className='text-center justify-center'>{comment.author.username}</span>
        </div>

        <h4 className='items-center justify-center text-center flex gap-3'>{comment.text}</h4>
    </div>
  )
}

export default Comment