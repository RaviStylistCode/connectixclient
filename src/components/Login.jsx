import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import { apiserver } from "@/main";
import { Loader2 } from "lucide-react";
import { setAuthUser } from "@/redux/AuthSlice";
import { useDispatch, useSelector } from "react-redux";

const Login = () => {
  const [input, setInput] = useState({
    username: "",
    password: "",
  });

  const dispatch=useDispatch();
  const [loading, setLoading] = useState(false);
  const {user}=useSelector(store=>store.auth);

  const changeEventhandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const navigate=useNavigate();

  const loginhandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await axios.post(`${apiserver}/users/login`, input, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });

      if (res.data.success) {
        dispatch(setAuthUser(res.data.user));
        toast.success(res.data.message);
        setInput({ username: "", password: "" });
        navigate("/");
      }
    } catch (error) {
      console.log(error);
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
        onSubmit={loginhandler}
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
          <span>Password</span>
          <Input
            type="password"
            name="password"
            value={input.password}
            onChange={changeEventhandler}
            className="focus-visible:ring-transparent my-2"
          />
        </div>

        <p className="text-right text-sm cursor-pointer">
          <Link>Forget Password</Link>
        </p>

        {loading ? (
          <Button>
            <Loader2 className="mr-2 h-4 animate-spin" />
            please wait
          </Button>
        ) : (
          <Button type="submit">Login</Button>
        )}

        <p className="text-center">
          Don't have an account? <Link to={"/register"}>Register</Link>{" "}
        </p>
      </form>
    </div>
  );
};

export default Login;
