import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Edit, Trash2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { apiserver } from "@/main";
import toast from "react-hot-toast";

const AdminUsers = () => {
  const [user, setUser] = useState([]);
  const { userandpost } = useSelector((store) => store.admin);
  const [role,setRole]=useState('');

  const rolechange=(value)=>{
    setRole(value);
  }

  const rolechangehandler=async(id)=>{
    try {
      const res=await axios.patch(`${apiserver}/users/admin/role/${id}`,{role},{
        headers:{
          "Content-Type":"application/json"
        },
        withCredentials:true
      });
      if(res.data.success){
        toast.success(res.data.message);
      }
      
    } catch (error) {
      // console.log(error);
      toast.error(error.response.data.message);
    }
  }

  useEffect(() => {
    if (userandpost?.user) {
      setUser(userandpost?.user);
    }
  }, []);

  return (
    <div className="ml-[20%] my-5 px-5">
      <div className="p-2 bg-white">
        <div className="grid grid-cols-10 gap-2 items-center justify-items-center border-b-2 border-rose-600 py-2">
          <span className="font-bold text-gray-500">Image</span>
          <span className="font-bold text-gray-500">Username</span>
          <span className="font-bold text-gray-500">Email</span>
          <span className="font-bold text-gray-500">Gender</span>
          <span className="font-bold text-gray-500">Role</span>
          <span className="font-bold text-gray-500">Bio</span>
          <span className="font-bold text-gray-500">Posts</span>
          <span className="font-bold text-gray-500">follower</span>
          <span className="font-bold text-gray-500">Following</span>
          <span className="font-bold text-gray-500">Action</span>
        </div>

        {user &&
          user?.map((item) => {
            return (
              <div key={item._id} className="grid grid-cols-10 px-0 my-3 justify-items-center items-center">
                <Avatar className="w-14 h-14">
                  <AvatarImage src={item?.image} alt="img" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <span>{item.username}</span>
                <span>{item.email}</span>
                <span>{item.gender}</span>
                <span>{item.role}</span>
                <span>{item.bio}</span>
                <span>{item.posts.length}</span>
                <span>{item.follower.length}</span>
                <span>{item.following.length}</span>
                <span className="flex gap-2">
                  <Dialog asChild>
                    <DialogTrigger>
                      <Edit className="cursor-pointer" />
                    </DialogTrigger>
                    <DialogContent>
                      <div className="p-8">
                        <h1 className="font-semibold my-5">Role</h1>
                        <Select
                          defaultValue={item.role}
                          onValueChange={rolechange}
                        >
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Theme" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="user">user</SelectItem>
                            <SelectItem value="admin">admin</SelectItem>
                          </SelectContent>
                        </Select>
                        <Button className='my-5' onClick={()=>rolechangehandler(item._id)}>Update</Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                  {/* <Trash2 className='cursor-pointer'/> */}
                </span>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default AdminUsers;
