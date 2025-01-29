import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { setSelectedUser } from "@/redux/AuthSlice";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { MessageCircleCode } from "lucide-react";
import Messages from "./Messages";
import axios from "axios";
import { apiserver } from "@/main";
import toast from "react-hot-toast";
import { setMessages } from "@/redux/socketSlice";

const ChatPage = () => {
  const { user, suggestedUser, selectedUser } = useSelector(
    (store) => store.auth
  );
  const {onlineUsers,messages}=useSelector(store=>store.socket);
  const dispatch = useDispatch();

  const [text,setTextMessage]=useState('');



  const sendMessagehandler=async()=>{
    try {
      const res=await axios.post(`${apiserver}/messages/send/${selectedUser?._id}`,{text},{
        headers:{
          "Content-Type":"application/json"
        },
        withCredentials:true
      });

      if(res.data.success){
        toast.success(res.data.message);
        dispatch(setMessages([...messages,res.data.newMessage]));
        setTextMessage("");
      }
      
    } catch (error) {
      toast.error(error.response.data.message);
      console.log(error);
      
    }

  }

  useEffect(()=>{
    return ()=>{
      dispatch(setSelectedUser(null));
    }
  },[])
  return (
    <div className="flex ml-[18%] h-screen">
      <section className="w-full md:w-1/4 my-2 p-4">
        <h1 className="font-bold mb-1 px-3 text-xl">{user?.username}</h1>
        <hr className="mb-1 border-gray-400" />
        <div className="overflow-y-auto h-[80vh]  ">
          {suggestedUser.map((suggestuser) => {
          const isOnline=onlineUsers.includes(suggestuser?._id);
         return (
            <div
              key={suggestuser?._id}
              onClick={() => dispatch(setSelectedUser(suggestuser))}
              className="flex gap-3 items-center p-3 hover:bg-gray-50 cursor-pointer rounded-lg my-2"
            >
              <Avatar className='w-14 h-14'>
                <AvatarImage src={suggestuser?.image} alt="img" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <div className="flex flex-col">
                <span className="font-medium">{suggestuser?.username}</span>
                <span
                  className={`text-xs ${
                    isOnline ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {isOnline ? "online" : "offline"}
                </span>
              </div>
            </div>
          )})}
        </div>
      </section>

      {
        selectedUser?(
          <section className="flex-1 border-l border-l-gray-300 flex flex-col h-full">
            <div className="flex gap-3 items-center px-3 py-2 border-b border-gray-300 sticky top-0 bg-white">
            <Avatar>
              <AvatarImage src={selectedUser?.image} alt="img"/>
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <span className="font-bold">{selectedUser?.username}</span>
            </div>
            </div>
            <Messages selectedUser={selectedUser}/>
            <div className="flex items-center p-4 border-t border-gray-400">
              <Input type="text" name="text" value={text} onChange={(e)=>setTextMessage(e.target.value)} className="flex-1 mr-2 focus-visible:ring-transparent" placeholder="message..."/>
              <Button onClick={sendMessagehandler}>Send</Button>
            </div>

          </section>
        ):
        (<div className="flex flex-col items-center justify-center mx-auto">
          <MessageCircleCode className="w-32 h-32 my-4"/>
          <h1 className="font-medium text-xl">Your Messages</h1>
          <span className="text-xs">Send a message to start chat</span>
          </div>)
      }
    </div>
  );
};

export default ChatPage;
