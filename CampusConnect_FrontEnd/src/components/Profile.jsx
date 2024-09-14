import React, {useState} from "react";
import { Label } from "./ui/label";
import Navbar from "./Navbar";
import PostCard from "./PostCard";
import UpdatePost from "./UpdatePost";

const Profile = () => {
  const [ShowUpdateForm, setShowUpdateForm] = useState(false)
  const ShowForm = () => {
    setShowUpdateForm(!ShowUpdateForm)
  }
  return (
    <>
      <Navbar />
      {ShowUpdateForm && <UpdatePost Data={{ ShowForm: ShowForm }}/>}
      <div className="text-[50px] text-center font-serif mt-[20px] my-2 ">
        Admin Profile
      </div>
      <div className="flex justify-evenly border border-red-500 w-[90%] mx-auto gap-2">
        <Label className="text-[30px]">
          Faculty Name:{" "}
          <span className="font-gray-500">
            {localStorage.getItem("username")}
          </span>
        </Label>

        <Label className="text-[30px]">
          Faculty Email:{" "}
          <span className="font-gray-500">{localStorage.getItem("email")}</span>
        </Label>
      </div>
      <div className="mt-2 text-center border border-red-500 p-2 w-[90%] mx-auto">
        <Label className="text-[30px] ">POSTS</Label>
      </div>

      <div className="mx-auto border border-red-500 w-[90%] my-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
        <PostCard Data={{ ShowForm: ShowForm }} />
        <PostCard Data={{ ShowForm: ShowForm }} />
      </div>
    </>
  );
};

export default Profile;
