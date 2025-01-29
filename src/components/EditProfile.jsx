import React, { useRef, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import toast from "react-hot-toast";
import axios from "axios";
import { apiserver } from "@/main";
import { useNavigate } from "react-router-dom";
import { setAuthUser } from "@/redux/AuthSlice";
import { Loader2 } from "lucide-react";

const EditProfile = () => {
  const { user } = useSelector((store) => store.auth);
  const dispatch=useDispatch();
  const navigate=useNavigate();
  const imageref = useRef();
  const [loading,setLoading]=useState(false);

  const [input,setInput]=useState({
    image:user?.image,
    bio:user?.bio,
    gender:user?.gender
  });


    const changefilehandler=(e)=>{
      const file=e.target.files?.[0];
      if(file) setInput({...input,image:file});
    }

    const changegenderhandler=(value)=>{
      setInput({...input,gender:value});
    }

    const editprofilehandler=async()=>{
      const formData=new FormData();
      formData.append("bio",input.bio);
      formData.append("gender",input.gender);
      if(input.image){
        formData.append("image",input.image);
      }
      // console.log(input)
      try {
        setLoading(true);
        const res=await axios.put(`${apiserver}/users/profile/me`,formData,{
          headers:{
            'Content-Type':"multipart/form-data"
          },
          withCredentials:true
        });

        if(res.data.success){
          // console.log(res.data)
          toast.success(res.data.message);
          const updatedData={...user,
            bio:res.data.user?.bio,
            image:res.data.user?.image,
            gender:res.data.user?.gender
          }
          dispatch(setAuthUser(updatedData));
          navigate(`/profile/${user?._id}`);

        }
        
      } catch (error) {
        // console.log(error);
        toast.error(error.response.data.message);
      }finally{
        setLoading(false);
      }


    }

  return (
    <div className="flex max-w-2xl mx-auto pl-10 my-10">
      {/* <h1>{import.meta.env.VITE_name}</h1> */}
      <section className="flex flex-col gap-6 w-full">
        <h1 className="font-bold text-xl">Edit Profile</h1>
        <div className="flex justify-between items-center bg-gray-100 rounded-xl p-4">
          <div className="flex items-center gap-3">
            <Avatar>
              <AvatarImage src={user?.image} />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>

            <div className="">
              <h1 className="font-bold text-sm">{user?.username}</h1>
              <span>{user?.bio || "Bio Here..."}</span>
            </div>
          </div>

          <input  ref={imageref} type="file" onChange={changefilehandler} className="hidden" />
          <Button
            onClick={() => imageref.current.click()}
            className="bg-[#0095F6] h-8 hover:bg-[#258fd6]"
          >
            Change Photo
          </Button>
        </div>

        <div>
          <h1 className="font-semibold ">Bio</h1>
          <Textarea value={input.bio} onChange={(e)=>setInput({...input,bio:e.target.value})} name="bio" className="focus-visible:ring-transparent" />
        </div>

        <div>
          <h1 className="font-semibold">Gender</h1>
          <Select defaultValue={input.gender} onValueChange={changegenderhandler}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Theme" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="male">male</SelectItem>
              <SelectItem value="female">female</SelectItem>
              
            </SelectContent>
          </Select>
        </div>

        <div className="flex justify-end">
          {
            loading ? (
              <Button className='w-fit bg-[#0095f6]'>
                <Loader2 className="w-4 h-4 mr-2 animate-spin"/>
                please wait ...
              </Button>
            ):(

              <Button onClick={editprofilehandler} className='w-fit bg-[#0096f6]'>Save</Button>
            )
          }
        </div>
      </section>
    </div>
  );
};

export default EditProfile;
