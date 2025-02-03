import React, { useState } from "react";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { AvatarImage } from "@radix-ui/react-avatar";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";
import { Bookmark, MessageCircle, MoreHorizontal, Send } from "lucide-react";
import { Button } from "./ui/button";
import { FaHeart, FaRegBookmark, FaRegHeart } from "react-icons/fa";
import CommentDialog from "./CommentDialog";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { apiserver } from "@/main";
import toast from "react-hot-toast";
import { AllPosts, setSelectedPost } from "@/redux/postSlice";
import { Badge } from "./ui/badge";
import { setAuthUser } from "@/redux/AuthSlice";

const Post = ({ post }) => {
  const [text, setText] = useState("");
  const [open, setOpen] = useState(false);

  const { user,userprofile } = useSelector((store) => store.auth);
  const { posts } = useSelector((store) => store.post);
  const dispatch = useDispatch();

  const [liked, setLiked] = useState(post.likes.includes(user?._id) || false);
  const [postlike, setPostlike] = useState(post.likes.length);
  const [comment, setComment] = useState(post.comments);
  const [bookmark,setbookmark]=useState(false);

  const commenthandler = (e) => {
    const inputText = e.target.value;
    if (inputText.trim()) {
      setText(inputText);
    } else {
      setText("");
    }
  };

  const deleteposthandler = async () => {
    try {
      const res = await axios.delete(`${apiserver}/posts/delete/${post?._id}`, {
        withCredentials: true,
      });
      if (res.data.success) {
        const updatedpost = posts.filter(
          (postitem) => postitem?._id !== post?._id
        );
        dispatch(AllPosts(updatedpost));
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  const likeandunlikeposthandler = async () => {
    try {
      const res = await axios.get(
        `${apiserver}/posts/likeandunlike/${post?._id}`,
        { withCredentials: true }
      );
      if (res.data.success) {
        setLiked(!liked);
        const updatedlike = liked ? postlike - 1 : postlike + 1;
        setPostlike(updatedlike);
        const updatedpostdata = posts.map((p) =>
          p._id === post?._id
            ? {
                ...p,
                likes: liked
                  ? p.likes.filter((id) => id !== user?._id)
                  : [...p.likes, user?._id],
              }
            : p
        );
        dispatch(AllPosts(updatedpostdata));
        toast.success(res.data.message);
      }
    } catch (error) {
      // console.log(error)
      toast.error(error.response.data.message);
    }
  };

  const sendCommenthandler = async () => {
    try {
      const res = await axios.post(
        `${apiserver}/posts/comment/${post?._id}`,
        { text },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      if (res.data.success) {
        console.log(res.data);
        const updateCommentdata = [...comment, res.data.comment];
        setComment(updateCommentdata);

        const updatepostdata = posts.map((p) =>
          p._id === post?._id
            ? {
                ...p,
                comments: updateCommentdata,
              }
            : p
        );
        dispatch(AllPosts(updatepostdata));
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    } finally {
      setText("");
    }
  };

  const bookmarkhandler=async()=>{
    try {
        const res=await axios.get(`${apiserver}/posts/bookmark/${post?._id}`,{withCredentials:true});
        if(res.data.success){
          toast.success(res.data.message);
          setbookmark(!bookmark);
        }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  }

  const followandunfollowhandler=async()=>{
    try {
      const res=await axios.get(`${apiserver}/users/follow/${post?.owner._id}`,{withCredentials:true});
      if(res.data.success){
        toast.success(`${res.data.message}`); 
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  }
  return (
    <div className="md:my-8 w-full max-w-sm mx-auto">
      <div className="flex items-center justify-between">
        <div className="flex items-center justify-center gap-3 ">
          <Avatar>
            <AvatarImage
              src={post?.owner?.image}
              className="object-cover w-full"
            />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div className="flex gap-3 justify-center items-center">
            <h3 className="text-lg font-bold text-gray-500">
              {post?.owner?.username}
            </h3>
           {user?._id === post?.owner?._id && <Badge variant="secondary">Author</Badge>} 
          </div>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <MoreHorizontal className="cursor-pointer" />
          </DialogTrigger>

          <DialogContent className="flex flex-col text-center items-center text-sm">
            {user && user?._id !== post?.owner?._id &&( 
            
            

            <Button variant="ghost" className="w-fit text-rose-600 font-bold"
            onClick={followandunfollowhandler}
            >
              {userprofile && userprofile?.following?.includes(post?.owner?._id) ? "unfollow" : "follow" }
            </Button>
            
            )
            }
            <Button variant="ghost" className="w-fit font-bold" onClick={bookmarkhandler}>
              Save
            </Button>
            {user && user?._id === post?.owner?._id ? (
              <Button
                onClick={deleteposthandler}
                variant="ghost"
                className="w-fit font-bold"
              >
                Delete
              </Button>
            ) : (
              ""
            )}
          </DialogContent>
        </Dialog>
      </div>
      <img
        className="rounded-sm object-cover aspect-square w-full my-2"
        src={post?.url}
        alt="post_img"
      />

      <div className="flex justify-between my-2 px-3">
        <div className="flex gap-3 items-center ">
          {liked ? (
            <FaHeart
              onClick={likeandunlikeposthandler}
              size={"22px"}
              className="text-rose-700 cursor-pointer"
            />
          ) : (
            <FaRegHeart
              onClick={likeandunlikeposthandler}
              size={"22px"}
              className="cursor-pointer"
            />
          )}

          <MessageCircle
            onClick={() => {
              dispatch(setSelectedPost(post));
              setOpen(true);
            }}
            className="cursor-pointer hover:text-gray-600"
          />
          <Send className="cursor-pointer hover:text-gray-600" />
        </div>
        
        <Bookmark onClick={bookmarkhandler} className="cursor-pointer hover:text-gray-600" />
      </div>

      <span className="font-medium block mb-2 mx-3">{postlike} likes</span>
      <p>
        <span className="font-medium mr-2 mx-2">{post?.owner?.username}</span>
        {post?.caption}
      </p>

      {comment.length > 0 && (
        <span
          onClick={() => {
            dispatch(setSelectedPost(post));
            setOpen(true);
          }}
          className="px-2 cursor-pointer"
        >
          view all {comment.length} comments
        </span>
      )}

      <CommentDialog open={open} setOpen={setOpen} />
      <div className="flex my-2 px-2">
        <input
          type="text"
          placeholder="add a comment"
          value={text}
          onChange={commenthandler}
          className="w-full text-sm outline-none p-2 items-center"
        />
        {text && (
          <span
            onClick={sendCommenthandler}
            className="text-[#3BADF8] cursor-pointer"
          >
            Post
          </span>
        )}
      </div>
    </div>
  );
};

export default Post;
