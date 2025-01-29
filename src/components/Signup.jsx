import React, { useEffect, useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { apiserver } from "@/main";
import toast from "react-hot-toast";
import { Loader2 } from "lucide-react";
import { useSelector } from "react-redux";

const Signup = () => {
  const [input, setInput] = useState({
    username: "",
    email: "",
    password: "",
    gender: "",
  });

  const [loading, setLoading] = useState(false);
  const {user}=useSelector(store=>store.auth);

  const changeEventhandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const navigate=useNavigate();

  const signuphandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await axios.post(`${apiserver}/users/register`, input, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });

      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/login");
        // console.log(res.data);
      }
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(()=>{
      if(user){
        navigate("/");
      }
    },[])

  return (
    <div className="flex items-center w-screen h-screen  justify-center ">
      <form
        className="shadow-lg flex flex-col px-10 sm:px-17 py-3 gap-5 "
        method="post"
        onSubmit={signuphandler}
      >
        <div className="my-4">
          <h1 className="text-center text-xl font-bold">Logo</h1>
          <p className="font-semibold text-lg">
            talk with your friends and enjoy with this app
          </p>
        </div>

        <div>
          <span>Username</span>
          <Input
            type="text"
            name="username"
            value={input.username}
            onChange={changeEventhandler}
            className="focus-visible:ring-transparent my-2"
          />
        </div>

        <div>
          <span>Email</span>
          <Input
            type="email"
            name="email"
            value={input.email}
            onChange={changeEventhandler}
            className="focus-visible:ring-transparent my-2"
          />
        </div>

        <div>
          <span>Password</span>
          <Input
            type="password"
            name="password"
            value={input.password}
            onChange={changeEventhandler}
            className="focus-visible:ring-transparent my-2"
          />
        </div>

        <div>
          <span>Gender</span>
          <br />
          <select
            name="gender"
            value={input.gender}
            onChange={changeEventhandler}
            className="w-full h-[40px] rounded text-center border-none outline-none my-2"
          >
            <option value=".....">....</option>
            <option value="male">male</option>
            <option value="female">female</option>
          </select>
        </div>

        {loading ? (
          <Button>
            <Loader2 className="mr-2 h-4 animate-spin" />
            please wait
          </Button>
        ) : (
          <Button>Sign up</Button>
        )}
        <p className="text-center">
          Already have an account? <Link to={"/login"}>Login</Link>{" "}
        </p>
      </form>
    </div>
  );
};

export default Signup;
