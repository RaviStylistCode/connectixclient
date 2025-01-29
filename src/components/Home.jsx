import React from "react";
import Feed from "./Feed";
import { Outlet } from "react-router-dom";
import RightSidebar from "./RightSidebar";
import getAllPosts from "@/hooks/getAllPosts";
import useGetSuggestedUser from "@/hooks/useGetSuggestedUser";
import useGetUserprofile from "@/hooks/useGetUserprofile";

const Home = () => {
  getAllPosts();
  useGetSuggestedUser();
  useGetUserprofile();
  return (
    <div className="flex sm:px-5">
      <div className="flex-grow">
        <Feed />
        <Outlet />
      </div>
      <RightSidebar/>
    </div>
  );
};

export default Home;
