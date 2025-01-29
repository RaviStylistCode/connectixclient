import React, { useEffect } from 'react'
import { createBrowserRouter,RouterProvider } from 'react-router-dom'
import Signup from './components/Signup'
import Login from './components/Login'
import MainLayout from './components/MainLayout'
import Home from './components/Home'
import Profile from './components/Profile'
import EditProfile from './components/EditProfile'
import ChatPage from './components/ChatPage'
import { io } from 'socket.io-client'
import { useDispatch, useSelector } from 'react-redux'
import { setOnlineUsers, setSocket } from './redux/socketSlice'
import { setLikenotification } from './redux/rtnSlice'
import Notification from './components/Notification'
import Settings from './components/Settings'
import Updatepassword from './components/Updatepassword'
import Search from './components/Search'
import AdminMainLayout from './Admin/AdminMainLayout'
import AdminHome from './Admin/AdminHome'
import AdminUsers from './Admin/AdminUsers'
import AdminPosts from './Admin/AdminPosts'
import UserProtectedRoute from './ProtectedRoute/UserProtectedRoute'
import AdminProtectedRoute from './ProtectedRoute/AdminProtectedRoute'

const App = () => {

  const {user}=useSelector(store=>store.auth);
  const {Socket}=useSelector(store=>store.socket);
  const dispatch=useDispatch();

  useEffect(()=>{
    if(user){
      const socketIo=io(import.meta.env.VITE_server  ,{
        query:{
          userId:user?._id
          },
          transports:['websocket']
      });

      dispatch(setSocket(socketIo));

      socketIo.on("getOnlineUser",(onlineUsers)=>{
        dispatch(setOnlineUsers(onlineUsers));
      });

      socketIo.on("notification",(notification)=>{
        // console.log(notification)
        dispatch(setLikenotification(notification));
        // dispatch(setLikenotification(notification));
      })

      return ()=>{
        socketIo.close();
        dispatch(setSocket(null));
      }
    }else if(Socket){
      Socket?.close();
      dispatch(setSocket(null));

    }
  },[user,dispatch]);

  const browserRouter=createBrowserRouter([
    {
      path:'/',
      element: <UserProtectedRoute><MainLayout/></UserProtectedRoute> ,
      children:[
        {
          path:'/',
          element:<UserProtectedRoute><Home/></UserProtectedRoute>
        },

        {
          path:"/profile/:id",
          element: <UserProtectedRoute><Profile/></UserProtectedRoute>
        },
        {
          path:'/search',
          element:<UserProtectedRoute><Search/></UserProtectedRoute>
        },

        {
          path:"/account/edit",
          element:<UserProtectedRoute><EditProfile/></UserProtectedRoute>
        },
        {
          path:"/chat",
          element:<UserProtectedRoute><ChatPage/></UserProtectedRoute>
        },
        {
          path:'/notification',
          element:<UserProtectedRoute><Notification/></UserProtectedRoute>
        },
        {
          path:'/account/settings',
          element:<UserProtectedRoute><Settings/></UserProtectedRoute>
        },
        {
          path:'/account/settings/update/password',
          element:<UserProtectedRoute><Updatepassword/></UserProtectedRoute>
        }
      ]
    },

    {
      path:"/login",
      element:<Login/>
    },

    {
      path:"/register",
      element:<Signup/>
    },

    {
      path:'/admin/main/',
      element:<AdminProtectedRoute><AdminMainLayout/></AdminProtectedRoute>,
      children:[
        {
          path:'/admin/main/',
          element:<AdminProtectedRoute><AdminHome/></AdminProtectedRoute>
        },
       
        {
          path:"/admin/main/users",
          element:<AdminProtectedRoute><AdminUsers/></AdminProtectedRoute>
        },
        {
          path:'/admin/main/posts',
          element:<AdminProtectedRoute><AdminPosts/></AdminProtectedRoute>
        }
      ]
    }
  ]);
  return (
   <>
   <RouterProvider router={browserRouter}/>
   </>
  )
}

export default App