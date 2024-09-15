import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { FcLike, FcLikePlaceholder } from "react-icons/fc";

const BACKEND_URL = "http://localhost:8000";

const HomePostCard = ({ notice }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [imageUrl, setImageUrl] = useState("");

  const handleToggle = () => {
    setIsExpanded(!isExpanded);
  };

  const handleLikeToggle = () => {
    setIsLiked(!isLiked);
  };

  useEffect(() => {
    if (notice.image) {
      setImageUrl(`${BACKEND_URL}${notice.image}`);
    }
  }, [notice]);

  return (
    <div className="w-[50%] mx-auto my-2">
      <Card className="w-auto shadow-md ">
        <CardHeader className="flex flex-row gap-2">
          <div className="flex items-center gap-3">
            <div>
              <Avatar className="cursor-pointer">
                <AvatarImage
                  src="https://github.com/shadcn.png"
                  alt="@shadcn"
                />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </div>
            <div>
              <CardTitle className="cursor-pointer">
                {notice.username}
              </CardTitle>
              <CardDescription>
                Notice Department : {notice.department}
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="flex flex-col justify-center gap-4">
          {imageUrl && (
            <img src={imageUrl} className="rounded-lg" alt="Post Image" />
          )}
          <p className="text-lg">
            {isExpanded
              ? notice.description
              : `${notice.description.slice(0, 100)}...`}
          </p>
          <button onClick={handleToggle} className="text-black hover:underline">
            {isExpanded ? "Show Less" : "Show More"}
          </button>
        </CardContent>
        <CardFooter className="flex gap-2">
          <div onClick={handleLikeToggle}>
            {isLiked ? (
              <FcLike size={24} className="cursor-pointer" />
            ) : (
              <FcLikePlaceholder size={24} className="cursor-pointer" />
            )}
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default HomePostCard;
