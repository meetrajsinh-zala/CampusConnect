import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import th from "../assets/th.jpg";
import { FcLike, FcLikePlaceholder } from "react-icons/fc";
import Nav from "../components/nav";

const Home = () => {
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
      <Nav />
      <div className="w-[50%] mx-auto my-2">
        <Card className="w-auto shadow-md ">
          <CardHeader className="flex flex-row gap-2">
            <Avatar className="cursor-pointer">
              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <CardTitle className="cursor-pointer">Username</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col justify-center gap-4">
            <img src={th} className="rounded-lg"></img>
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
          <CardFooter className="flex gap-2">
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
          </CardFooter>
        </Card>
      </div>

      <div className="w-[50%] mx-auto my-2">
        <Card className="w-auto shadow-md ">
          <CardHeader className="flex flex-row gap-2">
            <Avatar className="cursor-pointer">
              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <CardTitle className="cursor-pointer">Username</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col justify-center gap-4">
            <img src={th} className="rounded-lg"></img>
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
          <CardFooter className="flex gap-2">
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
          </CardFooter>
        </Card>
      </div>
    </>
  );
};

export default Home;
