import axios from 'axios';
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import {  useNavigate } from 'react-router-dom';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { setAuthUser } from '@/redux/AuthSlice';
import toast from 'react-hot-toast';
import { Loader2 } from 'lucide-react';
import { apiserver } from '@/main';

const Updatepassword = () => {

    const [input, setInput] = useState({
        oldPassword: "",
        newPassword: "",
      });
    
      const dispatch=useDispatch();
      const [loading, setLoading] = useState(false);
    
      const changeEventhandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
      };
    
      const navigate=useNavigate();
    
      const updatepasswordhandler = async (e) => {
        e.preventDefault();
        
        try {
          setLoading(true);
          const res = await axios.post(`${apiserver}/users/update/password`, input, {
            headers: {
              "Content-Type": "application/json",
            },
            withCredentials: true,
          });
    
          if (res.data.success) {
            dispatch(setAuthUser(null));
            toast.success(res.data.message);
            setInput({ oldPassword: "", newPassword: "" });
            navigate("/login");
          }
        } catch(error){
        //   console.log(error);
          toast.error(error.response.data.message);
        } finally {
          setLoading(false);
        }
      };

  return (
    <div className='ml-[20%] my-5 flex justify-center items-center'>
        
        <div className="flex items-center w-screen h-screen  justify-center ">
      <form
        className="shadow-lg flex flex-col px-10 sm:px-17 py-3 gap-5 "
        onSubmit={updatepasswordhandler}
      >
        <div className="my-4">
          <h1 className="text-center text-xl font-bold">Logo</h1>
          <p className="font-semibold text-lg">
            Update your password to secure account !
          </p>
        </div>

        <div>
          <span>oldPassword</span>
          <Input
            type="text"
            name="oldPassword"
            value={input.oldPassword}
            onChange={changeEventhandler}
            className="focus-visible:ring-transparent my-2"
          />
        </div>

        <div>
          <span>newPassword</span>
          <Input
            type="password"
            name="newPassword"
            value={input.newPassword}
            onChange={changeEventhandler}
            className="focus-visible:ring-transparent my-2"
          />
        </div>

      

        {loading ? (
          <Button>
            <Loader2 className="mr-2 h-4 animate-spin" />
            please wait
          </Button>
        ) : (
          <Button type="submit">Update</Button>
        )}

      
      </form>
    </div>


    </div>
  )
}

export default Updatepassword