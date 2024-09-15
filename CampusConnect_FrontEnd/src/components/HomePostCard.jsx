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
import { Button } from "./ui/button";
import { Link } from "react-router-dom";

const BACKEND_URL = "http://localhost:8000";
const token = localStorage.getItem("accessToken");

const HomePostCard = ({ notice }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [likeCount, setLikeCount] = useState(notice.like_count);

  const handleToggle = () => {
    setIsExpanded(!isExpanded);
  };

  const handleLikeToggle = async () => {
    try {
      const response = await fetch(
        `${BACKEND_URL}/api/notices/${notice.id}/like/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update like count");
      }

      const data = await response.json();
      setLikeCount(data.like_count);
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleDownload = () => {
    window.location.href = `http://localhost:8000/api/notices/${notice.id}/download/`;
  };

  useEffect(() => {
    if (notice.image) {
      setImageUrl(`${BACKEND_URL}${notice.image}`);
    }
  }, [notice]);
  return (
    <div className="w-full sm:w-[75%] lg:w-[50%] mx-auto my-2">
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
              <CardTitle className="cursor-pointer text-lg font-medium">
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
          <p className="text-sm text-gray-400">
            Created On :{" "}
            {new Date(notice.created_at).toISOString().split("T")[0]}
          </p>
          {notice.file && (
            <Link
              className="text-blue-600"
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleDownload}
            >
              View Attached File
            </Link>
          )}
          {notice.description.length > 100 ? (
            <p className="text-lg">
              {isExpanded
                ? notice.description
                : `${notice.description.slice(0, 100)}...`}
            </p>
          ) : (
            <p className="text-lg">{notice.description}</p>
          )}
          {notice.description.length > 100 && (
            <button
              onClick={handleToggle}
              className="text-black hover:underline"
            >
              {isExpanded ? "Show Less" : "Show More"}
            </button>
          )}
        </CardContent>
        <CardFooter className="flex gap-2">
          <Button onClick={handleLikeToggle}>{likeCount} Likes</Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default HomePostCard;
