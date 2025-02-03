import {
  Heart,
  Home,
  LogOut,
  MessageCircle,
  PlusSquare,
  Search,
  TrendingUp,
} from "lucide-react";
import React, { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import toast from "react-hot-toast";
import axios from "axios";
import { apiserver } from "@/main";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setAuthUser } from "@/redux/AuthSlice";
import CreatePost from "./CreatePost";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Button } from "./ui/button";

const LeftSidebar = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const { user } = useSelector((store) => store.auth);
  const { likenotification } = useSelector(
    (store) => store.realtimenotification
  );
  const dispatch = useDispatch();

  const logouthandler = async () => {
    try {
      const res = await axios.get(`${apiserver}/users/logout`, {
        withCredentials: true,
      });
      if (res.data.success) {
        dispatch(setAuthUser(null));
        navigate("/login");
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const createPosthandler = () => {
    setOpen(true);
  };

  const myProfile = () => {
    navigate(`/profile/${user._id}`);
  };

  const sidebarhandler = (textType) => {
    if (textType === "Logout") {
      logouthandler();
    } else if (textType === "Create") {
      createPosthandler();
    } else if (textType === "Profile") {
      myProfile();
    } else if (textType === "Home") {
      navigate("/");
    } else if (textType === "Messages") {
      navigate("/chat");
    } else if (textType === "Notifications") {
      navigate("/notification");
    } else if (textType === "Search") {
      navigate("/search");
    }
  };

  const sidebarmenu = [
    { icon: <Home />, text: "Home" },
    { icon: <Search />, text: "Search" },
    { icon: <TrendingUp />, text: "Explore" },
    { icon: <MessageCircle />, text: "Messages" },
    { icon: <Heart />, text: "Notifications" },
    { icon: <PlusSquare />, text: "Create" },
    {
      icon: (
        <Avatar className="w-7 h-7">
          <AvatarImage className="" src={user?.image} alt="img" />
          <AvatarFallback>
            {user?.username ? user.username : "CN"}
          </AvatarFallback>
        </Avatar>
      ),
      text: "Profile",
    },
    { icon: <LogOut />, text: "Logout" },
  ];

  return (
    <div className="fixed bottom-0 bg-transparent backdrop-blur-2xl md:top-0 left-0    sm:left-0 z-10 border-r border-gray-300 w-[100%] md:w-[16%] md:h-screen sm:m-2 md:px-4 overflow-scroll">
      <div className="flex flex-row gap-4 overflow-scroll md:overflow-hidden md:flex-col justify-center left-0">
        <h1 className="my-8 font-bold pl-5 text-2xl font-mono hidden md:block">
          Connectix
        </h1>
        {sidebarmenu.map((item, index) => {
          return (
            <div
              onClick={() => sidebarhandler(item.text)}
              key={index}
              className="flex sm:gap-3  relative md:p-3 cursor-pointer  hover:bg-gray-300 rounded-lg    text-start sm:text-center sm:items-center my-2 mx-0 "
            >
              <span className="">{item.icon}</span>
              <span className="font-semibold hidden md:block">{item.text}</span>
              {item.text === "Notifications" && likenotification.length > 0 && (
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      size="icon"
                      className="rounded-full h-5 w-5 bg-red-600 absolute bottom-7 left-7"
                    >
                      {likenotification.length}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent>
                    <div>
                      {likenotification.length === 0 ? (
                        <p>no new notification</p>
                      ) : (
                        likenotification.map((notification) => {
                          return (
                            <div
                              key={notification.userId}
                              className="flex items-center gap-2 my-2"
                            >
                              <Avatar>
                                <AvatarImage
                                  src={notification.userDetails.image}
                                  alt="img"
                                />
                                <AvatarFallback>CN</AvatarFallback>
                              </Avatar>
                              <p className="text-sm">
                                <span>{notification.userDetails.username}</span>{" "}
                                liked your post
                              </p>
                            </div>
                          );
                        })
                      )}
                    </div>
                  </PopoverContent>
                </Popover>
              )}
            </div>
          );
        })}
        <CreatePost open={open} setOpen={setOpen} />
      </div>
    </div>
  );
};

export default LeftSidebar;
