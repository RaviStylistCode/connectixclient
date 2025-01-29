import React, { useRef, useState } from "react";
import { Dialog, DialogContent, DialogHeader } from "./ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { readFileasdatauri } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import toast from "react-hot-toast";
import axios from "axios";
import { apiserver } from "@/main";
import { useDispatch, useSelector } from "react-redux";
import { AllPosts } from "@/redux/postSlice";


const CreatePost = ({ open, setOpen }) => {
  const imageRef = useRef();
  const [caption, setCaption] = useState("");
  const [file, setFile] = useState();
  const [imagepreview, setImagepreview] = useState();
  const [loading, setLoading] = useState(false);

  const {user}=useSelector(store=>store.auth);
  const {posts}=useSelector(store=>store.post);
  const dispatch=useDispatch();

  const filechangehandler = async (e) => {
    const file = e.target.files?.[0];
    console.log(caption ,file);
    if (file) {
      setFile(file);
      const datauri = await readFileasdatauri(file);
      setImagepreview(datauri);
    }
  };

  const createposthandler = async (e) => {
    
    const image=file;
    try {
      setLoading(true);
      const res=await axios.post(`${apiserver}/posts/add`,{caption,image},{
        headers:{
          'Content-Type':'multipart/form-data'
        },
        withCredentials:true
      });
      if(res.data.success){
        dispatch(AllPosts([res.data.post,...posts]));
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }finally{
      setLoading(false);
      setCaption('');
      setFile('');
      setImagepreview('');
      setOpen(false);
    }
  };

  return (
    <Dialog open={open}>
      <DialogContent onInteractOutside={() => setOpen(false)}>
        <DialogHeader className="font-bold text-sm text-gray-600">
          Create new post
        </DialogHeader>
        <div className="flex items-center gap-3">
          <Avatar>
            <AvatarImage src={user?.image} alt="img" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div>
            <h3 className="text-sm text-gray-600 font-bold">{user?.username}</h3>
            <span className="text-sm font-semibold">{user?.bio}</span>
          </div>
        </div>

        <div>
          <textarea
            placeholder="Add the caption"
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            className="w-full p-2 border-none outline-none"
          />
          {imagepreview && (
            <div className="w-full h-64 flex items-center justify-center">
              <img
                src={imagepreview}
                alt="preview"
                className="object-cover w-full h-full rounded-md"
              />
            </div>
          )}
          <input
            ref={imageRef}
            type="file"
            className="hidden"
            onChange={filechangehandler}
          />
          <Button onClick={() => imageRef.current.click()}
            className='flex justify-center bg-blue-700 text-white w-full m-4'
            >
            Select a post
          </Button>
          {imagepreview &&
            (loading ? (
              <Button className='w-full m-4 '>
                <Loader2 className="mr-2 w-4 h-4 animate-spin" />
                please wait...
              </Button>
            ) : (
              <Button onClick={createposthandler}
              className='m-4 w-full bg-orange-500 text-white'
              > post</Button>
            ))}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CreatePost;
