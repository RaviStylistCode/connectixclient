import { setClearnotification } from "@/redux/rtnSlice";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import getAllPosts from "@/hooks/getAllPosts";

const Notification = () => {
    getAllPosts();
  const { likenotification, likenotification1 } = useSelector(
    (store) => store.realtimenotification
  );
  const dispatch = useDispatch();

  useEffect(() => {
    if (likenotification) {
      dispatch(setClearnotification());
    }
  }, []);
  return (
    <div className="ml-[18%] my-5 max-w-5xl  p-5">
      <h3 className="font-bold text-xl text-gray-400">Notification</h3>

      <div>
        {likenotification1.length <= 0 ? (
          <p>no new notification</p>
        ) : (
          likenotification1.map((notification) => {
            return (
              <div
                key={notification.userId}
                className="flex items-center gap-5 my-2"
              >
                <Avatar>
                  <AvatarImage src={notification.userDetails.image} alt="img" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <p className="text-sm">
                  <span>{notification.userDetails.username}</span> liked your
                  post
                </p>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default Notification;
