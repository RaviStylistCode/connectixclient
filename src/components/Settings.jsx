import React from "react";
import { Button } from "./ui/button";
import axios from "axios";
import { apiserver } from "@/main";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { setAuthUser } from "@/redux/AuthSlice";
import { Link, useNavigate } from "react-router-dom";

const Settings = () => {

    const dispatch=useDispatch();
    const navigate=useNavigate();

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
          console.log(error)
          // toast.error(error.response.data.message);
        }
      };

  const deletemyaccount = async () => {
    try {
      const res = await axios.delete(`${apiserver}/users/delete/me`, {
        withCredentials: true,
      });
      if (res.data.success) {
        toast.success(res.data.message);
        logouthandler();
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
  return (
    <div className="ml-[20%] my-5 max-w-2xl">
      <h3 className="text-2xl font-bold underline">Settings</h3>

      <div className="flex justify-between items-center my-3 p-4 bg-gray-100 rounded-xl">
        <p className="font-semibold ">Delete my account</p>
        <Button
          className="bg-blue-600 hover:bg-blue-700 transition-all"
          onClick={deletemyaccount}
        >
          Delete
        </Button>
      </div>


      <div className="flex justify-between items-center my-3 p-4 bg-gray-100 rounded-xl">
        <p className="font-semibold ">Change Password</p>
        <Link to={`/account/settings/update/password`}>
        <Button
          className="bg-blue-600 hover:bg-blue-700 transition-all"
        >
          update
        </Button>
        </Link>
      </div>


    </div>
  );
};

export default Settings;
