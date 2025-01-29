import React, { useEffect, useState } from "react";
import { Dialog, DialogClose, DialogContent, DialogTrigger } from "./ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Link } from "react-router-dom";
import { MoreHorizontal } from "lucide-react";
import { Button } from "./ui/button";
import { useDispatch, useSelector } from "react-redux";
import Comment from "./Comment";
import toast from "react-hot-toast";
import axios from "axios";
import { apiserver } from "@/main";
import { AllPosts } from "@/redux/postSlice";

const CommentDialog = ({ open, setOpen }) => {
  const { selectedPost } = useSelector((store) => store.post);
  const { posts } = useSelector((store) => store.post);
  const [text, setText] = useState("");
  const [comments, setComment] = useState([]);
  // const [postcomment,setPostcomment]=useState(selectedPost?.comments);
  const { user } = useSelector((store) => store.auth);

  const dispatch = useDispatch();

  useEffect(() => {
    if (selectedPost) {
      setComment(selectedPost.comments);
    }
  }, [selectedPost]);

  const changeCommenthandler = (e) => {
    const inputText = e.target.value;
    if (inputText.trim()) {
      setText(inputText);
    } else setText("");
  };

  const sendCommenthandler = async () => {
    try {
      const res = await axios.post(
        `${apiserver}/posts/comment/${selectedPost?._id}`,
        { text },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      if (res.data.success) {
        const updatedcomment = [...comments, res.data.comment];
        setComment(updatedcomment);
        const updatedpost = posts.map((p) =>
          p._id === selectedPost?._id
            ? {
                ...p,
                comments: updatedcomment,
              }
            : p
        );
        dispatch(AllPosts(updatedpost));
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      setText("");
    }
  };

  const bookmarkhandler = async () => {
    try {
      const res = await axios.get(
        `${apiserver}/posts/bookmark/${selectedPost?._id}`,
        { withCredentials: true }
      );
      if (res.data.success) {
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const followandunfollowhandler=async()=>{
    try {
      const res=await axios.get(`${apiserver}/users/follow/${selectedPost?.owner._id}`,{withCredentials:true});
      if(res.data.success){
        toast.success(`${res.data.message}`); 
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  }

  return (
    <Dialog open={open}>
      <DialogContent
        onInteractOutside={() => setOpen(false)}
        className="max-w-5xl max-h-3xl p-0 flex flex-col "
      >
        <div className="flex flex-1">
          <div className="w-1/2 ">
            <img
              className="w-full h-full  object-cover aspect-square rounded-lg"
              src={selectedPost?.url}
              alt="post_img"
            />
          </div>

          <div className="flex w-1/2 flex-col justify-between">
            <div className="flex items-center justify-between p-4">
              <div className="flex gap-3 items-center">
                <Link>
                  <Avatar>
                    <AvatarImage src={selectedPost?.owner?.image} />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                </Link>

                <div>
                  <Link>
                    <h3 className="font-semibold text-gray-600">
                      {selectedPost?.owner?.username}
                    </h3>
                  </Link>
                </div>
              </div>

              <Dialog>
                <DialogTrigger asChild>
                  <MoreHorizontal className="cursor-pointer" />
                </DialogTrigger>
                <DialogContent className="flex flex-col items-center cursor-pointer text-center">
                  {user &&
                    user?._id !== selectedPost?.owner?._id &&
                    (
                      <Button
                        variant="ghost"
                        className="w-fit text-rose-600 font-bold"
                        onClick={followandunfollowhandler}
                      >
                        unfollow
                      </Button>
                    ) }

                  <Button variant="secondary" onClick={bookmarkhandler}>
                    Save
                  </Button>
                </DialogContent>
              </Dialog>
            </div>
            <hr />
            <div className="flex-1 overflow-y-auto max-h-96 p-4">
              {comments.map((comment) => (
                <Comment key={comment._id} comment={comment} />
              ))}
            </div>
            <div className="p-4">
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={text}
                  placeholder="Add a comment..."
                  className="outline-none w-full border border-gray-300 p-2 "
                  onChange={changeCommenthandler}
                />
                <Button
                  disabled={!text.trim()}
                  onClick={sendCommenthandler}
                  variant="outline"
                >
                  Send
                </Button>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CommentDialog;
