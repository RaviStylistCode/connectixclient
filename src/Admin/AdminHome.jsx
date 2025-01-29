import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import useGetAdminuserDetail from "@/hooks/useGetAdminuserDetail";
import React from "react";
import { useSelector } from "react-redux";

import BarChart from "./Graph/BarChart";
import PieChart from "./Graph/PieChart";
import LineChart from "./Graph/LineChart";
import DoughnutChart from "./Graph/DoughnutChart";

const AdminHome = () => {
  useGetAdminuserDetail();
  const { userandpost } = useSelector((store) => store.admin);
  const { onlineUsers } = useSelector((store) => store.socket);

  return (
    <div className="ml-[20%] px-5 py-4 bg-gray-400  ">
      <div className="grid grid-cols-2  md:grid-cols-4 gap-4 py-4 px-4">
        <div className="rounded-lg bg-white p-3 text-center h-32 flex  justify-center items-center cursor-wait font-bold flex-col">
          <h4>Users</h4>
          <span>{userandpost.user.length}</span>
        </div>
        <div className="rounded-lg bg-white p-3 text-center h-32 flex  justify-center items-center cursor-wait font-bold flex-col">
          <h4>Posts</h4>
          <span>{userandpost.post.length}</span>
        </div>
        <div className="rounded-lg bg-white p-3 text-center h-32 flex  justify-center items-center cursor-wait font-bold flex-col">
          <h4>Gender</h4>
          <span>
            {userandpost.maleuser.length} male and{" "}
            {userandpost.femaleuser.length} female
          </span>
        </div>
        <div className="rounded-lg bg-white p-3 text-center h-32 flex  justify-center items-center cursor-wait font-bold flex-col">
          <h4>Active Users</h4>
          <span>{onlineUsers.length}</span>
        </div>
      </div>

      {/* Graphs */}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-2 py-5">
        <div className="bg-white rounded-lg h-96 flex justify-center   p-2 ">
          <PieChart />
        </div>
        <div className="bg-white rounded-lg h-96 col-span-2  p-5">
          <BarChart />
        </div>
      </div>

      <div className="bg-white p-4 my-3 rounded-lg">
        <LineChart />
      </div>

      {/* online users with  */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
        <div className="bg-gray-100 h-64  p-4 rounded-lg">
          <h3 className="font-bold text-center text-gray-400">
            Admin users ...
          </h3>
          <div className="p-4 overflow-y-scroll">
            {userandpost?.adminusers?.map((useritem) => {
              return (
                <div className="flex gap-2 justify-evenly items-center my-2">
                  <Avatar className="w-14 h-14">
                    <AvatarImage src={useritem.image} alt="img" />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                  <div className="flex flex-1 gap-5 justify-evenly items-center">
                    <span>{useritem.username}</span>
                    <span>{useritem.email}</span>
                    <span>{useritem.role}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="bg-white p-4 h-64 rounded-lg flex justify-center ">
          <DoughnutChart />
        </div>
      </div>


    </div>
  );
};

export default AdminHome;
