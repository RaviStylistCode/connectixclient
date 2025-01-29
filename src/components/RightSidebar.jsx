import React from 'react'
import { Link } from 'react-router-dom'
import { Avatar, AvatarFallback } from './ui/avatar'
import { AvatarImage } from '@radix-ui/react-avatar'
import { useSelector } from 'react-redux'
import SuggestedUser from './SuggestedUser'

const RightSidebar = () => {
  const {user}=useSelector(store=>store.auth);
  return (
    <div className='hidden sm:block my-10 pr-4 w-64'>
      <div className='flex gap-4 justify-center items-center w-fit'>
        <Link>
        <Avatar>
          <AvatarImage className='object-cover w-full' src={user?.image} alt='img'/>
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        </Link>

        <Link>
        <div className='flex flex-col text-sm font-semibold'>
          <h3>{user?.username}</h3>
          <span className='wrap text-gray-600 text-sm'>{user?.bio}</span>
        </div>
        </Link>
      </div>
      <hr />
      <SuggestedUser/>
    </div>
  )
}

export default RightSidebar