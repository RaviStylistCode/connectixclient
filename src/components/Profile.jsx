import useGetUserprofile from "@/hooks/useGetUserprofile";
import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { useSelector } from "react-redux";
import { Button } from "./ui/button";
import { AtSign, Heart, MessageCircle } from "lucide-react";
import { Badge } from "./ui/badge";

const Profile = () => {
  const params = useParams();
  const userId = params.id;

  useGetUserprofile(userId);

  const [activeTab, setActiveTab] = useState("posts");

  const handletabchange = (tab) => {
    setActiveTab(tab);
  };

  const { userprofile,user } = useSelector((store) => store.auth);
  const isLoggedin = user?._id === userprofile?._id;

  const displayposts =
    activeTab === "posts" ? userprofile?.posts : userprofile?.bookmark;

  return (
    <div className="max-w-7xl sm:mx-auto md:mx-[150px] flex justify-center items-center p-[30px] mx-20 my-5">
      <div className="flex flex-col justify-between items-center p-4 ">
        <section className="flex flex-col sm:flex-row justify-center sm:justify-evenly gap-4 ">
          <Avatar className="w-32 h-32">
            <AvatarImage src={userprofile?.image} />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>

          <section className="flex flex-col  justify-center items-start  gap-3 p-3 my-2">
            <div className="flex justify-evenly items-center flex-wrap gap-16 ">
              <h3 className="font-bold text-3xl">{userprofile?.username}</h3>
              {isLoggedin ? (
                <>
                  <Link  to={"/account/edit"}>
                  <Button variant="secondary">Edit Profile</Button>
                  </Link>

                  {
                    userprofile?.role === 'admin' && (
                      
                  <Link to={`/admin/main`}>
                  <Button variant="secondary">Admin Dashboard</Button>
                  </Link>
                    )
                  }

                  <Link to={`/account/settings`}>
                  <Button variant="secondary">Settings</Button>
                  </Link>
                </>
              ) : (
                <>
                  <Button className="bg-blue-500 text-white">Follow</Button>
                  <Button className="bg-blue-500 text-white">Message</Button>
                </>
              )}
            </div>

            <div className="flex justify-center my-5 flex-wrap  gap-10">
              <p>
                {userprofile?.posts.length}{" "}
                <span className="font-semibold">posts</span>
              </p>
              <p>
                {userprofile?.follower.length}{" "}
                <span className="font-semibold">follower</span>
              </p>
              <p>
                {userprofile?.following.length}{" "}
                <span className="font-semibold">following</span>
              </p>
            </div>

            <div className="font-semibold text-sm text-gray-600">
              <p>
                <Badge variant="secondary" className="text-center items-center">
                  <AtSign size={"22px"} />{" "}
                  <span className="text-xl mr-2">{userprofile?.username}</span>
                </Badge>
              </p>
              <span>{userprofile?.bio}</span>
            </div>
          </section>
        </section>

        <section className="w-full ">
          <div className="flex justify-center items-center gap-5 my-5 flex-wrap">
            <span
              className={`cursor-pointer font-semibold ${
                activeTab === "posts" ? "text-rose-500" : ""
              }`}
              onClick={() => handletabchange("posts")}
            >
              posts
            </span>
            <span
              className={`cursor-pointer font-semibold ${
                activeTab === "saved" ? "text-rose-500" : ""
              }`}
              onClick={() => handletabchange("saved")}
            >
              saved
            </span>
            {/* <span className="cursor-pointer font-semibold">Reel</span>
            <span className="cursor-pointer font-semibold">Archieve</span> */}
          </div>

          {/* posts aayenge */}
              <div className="w-full sm:grid sm:grid-cols-3 gap-3  sm:mx-20">

          {displayposts?.map((postitem) => {
            return (
              
                <div className="relative group">
                  <img
                    className="object-cover rounded-lg w-full aspect-square h-64 my-2"
                    src={postitem.url}
                    alt="myimg"
                  />
                  <div className="absolute flex justify-center items-center  inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg">

                    <div className="flex justify-center items-center gap-1">
                      <Button className="flex justify-center items-center gap-3 hover:text-gray-300">
                        <Heart/>
                        <span>{postitem.likes.length}</span>
                      </Button>

                      <Button className="flex justify-center items-center gap-3 hover:text-gray-300">
                        <MessageCircle/>
                        <span>{postitem.comments.length}</span>
                      </Button>

                    </div>

                  </div>
                </div>
              
            );
          })}
              </div>
        </section>
      </div>
    </div>
  );
};

export default Profile;
