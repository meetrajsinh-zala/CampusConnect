import React, { useState, useEffect } from "react";
import { Label } from "./ui/label";
import Navbar from "./Navbar";
import PostCard from "./PostCard";
import UpdatePost from "./UpdatePost";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Profile = () => {
  const [ShowUpdateForm, setShowUpdateForm] = useState(false);
  const [posts, setPosts] = useState([]);
  const token = localStorage.getItem("accessToken");

  const ShowForm = () => {
    setShowUpdateForm(!ShowUpdateForm);
  };

  useEffect(() => {
    if (localStorage.getItem("role") === "admin") {
      fetchPosts();
    }
  }, [localStorage.getItem("role")]);

  const fetchPosts = () => {
    axios
      .get("http://localhost:8000/api/FilterNotice/", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => setPosts(response.data))
      .catch((error) => console.error(error));
    console.log(posts);
  };

  const handleDelete = (postId) => {
    axios
      .delete(`http://localhost:8000/api/FilterNotice/${postId}/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        fetchPosts();
        toast.success("Successfully Delete Post...", {
          position: "bottom-right",
        });
      })
      .catch((error) => console.error("Error deleting post:", error));
  };

  return (
    <>
      <Navbar />
      <ToastContainer />
      {ShowUpdateForm && <UpdatePost Data={{ ShowForm: ShowForm }} />}
      <div
        className={`${
          localStorage.getItem("role") === "student" && "h-[calc(100vh-77px)]"
        } flex justify-center items-center`}
      >
        <Card
          className={`${
            localStorage.getItem("role") === "admin" ? "w-[90%]" : "w-[30%]"
          } my-2`}
        >
          <CardHeader>
            <CardTitle className="font-serif text-center">
              {localStorage.getItem("role").toUpperCase()} PROFILE
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="mx-auto flex items-center gap-8 w-[90%]">
              <div>
                <Avatar className="w-16 h-16">
                  <AvatarImage
                    src="https://github.com/shadcn.png"
                    alt="@shadcn"
                  />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </div>
              <div className="flex flex-col gap-[0.15rem]">
                <p className="font-medium">
                  {localStorage.getItem("username")}
                </p>
                <p className="font-medium">{localStorage.getItem("email")}</p>
              </div>
            </div>
            {localStorage.getItem("role") === "admin" && (
              <>
                <div className="mt-2 p-2 w-[90%] mx-auto">
                  <Label className="text-[30px] ">POSTS</Label>
                </div>
                <div className="mx-auto w-[90%] my-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {posts.map((post) => (
                    <PostCard
                      key={post.id}
                      data={post}
                      // onUpdate={handleUpdate}
                      onDelete={handleDelete}
                    />
                  ))}
                </div>
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default Profile;
