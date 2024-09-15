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
import { Button } from "@/components/ui/button";

const BACKEND_URL = "http://localhost:8000";

const PostCard = ({ onUpdate, data, onDelete }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [imageUrl, setImageUrl] = useState("");

  const fullText = data.description;

  const handleToggle = () => {
    setIsExpanded(!isExpanded);
  };

  useEffect(() => {
    if (data.image) {
      setImageUrl(`${BACKEND_URL}${data.image}`);
    }
  }, [data]);

  return (
    <div className="flex flex-col gap-2">
      <Card className="w-auto shadow-md ">
        <CardHeader className="flex flex-row items-center gap-2">
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
              <CardTitle className="cursor-pointer">{data.username}</CardTitle>
              <CardDescription>
                Notice Deparment : {data.department}
              </CardDescription>
            </div>
          </div>
        </CardHeader>

        <CardContent className="flex flex-col justify-center gap-4">
          <img src={imageUrl} className="rounded-lg" alt="Post Thumbnail" />
          {data.description.length > 100 ? (
            <p className="text-lg">
              {isExpanded ? fullText : `${fullText.slice(0, 100)}...`}{" "}
            </p>
          ) : (
            <p className="text-lg">{fullText}</p>
          )}
          {data.description.length > 100 && (
            <button
              onClick={handleToggle}
              className="text-black hover:underline"
            >
              {isExpanded ? "Show Less" : "Show More"}
            </button>
          )}
        </CardContent>

        <CardFooter className="flex gap-2 justify-between">
          <div className={`flex gap-2`}>
            <FcLike size={24} />
            <p className="select-none">{data.like_count} Likes</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={onUpdate}>
              Update
            </Button>
            <Button onClick={() => onDelete(data.id)}>Delete</Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default PostCard;
