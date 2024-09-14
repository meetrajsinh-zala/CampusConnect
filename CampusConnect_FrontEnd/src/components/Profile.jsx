import React, { useState } from "react";
import { Label } from "./ui/label";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import th from "../assets/th.jpg";
import { FcLike, FcLikePlaceholder } from "react-icons/fc";
import { Button } from "@/components/ui/button";
import Navbar from "./Navbar";

const Profile = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const fullText =
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti voluptatum beatae sint nam, rem id, consequuntur sunt aspernatur dolore ab reiciendis? Fugit aspernatur ab tenetur! Cum facilis repudiandae ab, reprehenderit dignissimos iste ratione eum inventore ipsum modi odio, vel veniam doloremque. Sed quas minus quos animi omnis unde fuga numquam assumenda dignissimos voluptate, quae aliquid in eveniet quis? Magnam aliquam non aperiam dolorem aut sunt dicta possimus incidunt, nostrum amet recusandae fugiat error quas, magni cupiditate animi ratione, nihil architecto obcaecati consequuntur voluptates minus facere. Odit non sit tempore totam iste, impedit fugit quisquam odio. Similique alias exercitationem quidem dicta.";
  //function to handle text toggle
  const handleToggle = () => {
    setIsExpanded(!isExpanded);
  };

  // State to manage whether the icon is liked or not
  const [isLiked, setIsLiked] = useState(false);

  // Function to handle icon toggle
  const handleLikeToggle = () => {
    setIsLiked(!isLiked);
  };
  return (
    <>
      <Navbar />
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
        <div className="flex flex-col gap-2">
          <Card className="w-auto shadow-md ">
            <CardHeader className="flex flex-row gap-2">
              <Avatar className="cursor-pointer">
                <AvatarImage
                  src="https://github.com/shadcn.png"
                  alt="@shadcn"
                />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <CardTitle className="cursor-pointer">Username</CardTitle>
            </CardHeader>

            <CardContent className="flex flex-col justify-center gap-4">
              <img src="" className="rounded-lg" alt="Post Thumbnail" />
              <p className="text-lg">
                {isExpanded ? fullText : `${fullText.slice(0, 100)}...`}{" "}
              </p>
              <button
                onClick={handleToggle}
                className="text-black hover:underline"
              >
                {isExpanded ? "Show Less" : "Show More"}
              </button>
            </CardContent>

            <CardFooter className="flex gap-2 justify-between">
              <div
                className={`flex gap-2 ${isLiked ? "liked" : "not-liked"}`}
                onClick={handleLikeToggle}
              >
                {isLiked ? (
                  <FcLike size={24} className="cursor-pointer" />
                ) : (
                  <FcLikePlaceholder size={24} className="cursor-pointer" />
                )}

                <p>Likes Count</p>
              </div>

              <div className="flex gap-2">
                <Button variant="outline">Update</Button>
                <Button>Delete</Button>
              </div>
            </CardFooter>
          </Card>
        </div>

        <div className="flex flex-col gap-2">
          <Card className="w-auto shadow-md ">
            <CardHeader className="flex flex-row gap-2">
              <Avatar className="cursor-pointer">
                <AvatarImage
                  src="https://github.com/shadcn.png"
                  alt="@shadcn"
                />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <CardTitle className="cursor-pointer">Username</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col justify-center gap-4">
              <img src="" className="rounded-lg" alt="Post Thumbnail" />
              <p className="text-lg">
                {isExpanded ? fullText : `${fullText.slice(0, 100)}...`}{" "}
              </p>
              <button
                onClick={handleToggle}
                className="text-black hover:underline"
              >
                {isExpanded ? "Show Less" : "Show More"}
              </button>
            </CardContent>
            <CardFooter className="flex justify-between gap-2">
              <div
                className={`icon-container ${isLiked ? "liked" : "not-liked"}`}
                onClick={handleLikeToggle}
              >
                {isLiked ? (
                  <FcLike size={24} className="cursor-pointer" />
                ) : (
                  <FcLikePlaceholder size={24} className="cursor-pointer" />
                )}
              </div>
              <div className="flex gap-2">
                <Button variant="outline">Update</Button>
                <Button>Delete</Button>
              </div>
            </CardFooter>
          </Card>
        </div>
      </div>
    </>
  );
};

export default Profile;
