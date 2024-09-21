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
import { IoCameraOutline } from "react-icons/io5";

const Profile = () => {
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const [posts, setPosts] = useState([]);
  const [userProfile, setUserProfile] = useState(null)
  const token = localStorage.getItem("accessToken");

  const handleEditClick = (post) => {
    setSelectedPost(post);
    setShowUpdateForm(true);
  };

  const handleCloseForm = () => {
    setShowUpdateForm(false);
    setSelectedPost(null);
  };

  const fetchProfile = () => {
    axios.get('http://localhost:8000/api/getProfile/',{
      headers: {
        Authorization : `Bearer ${token}`
      }
    })
    .then((response) => {
      setUserProfile(response.data)
    })
    .catch((error) => {
      console.error(error)
    })
  }

  useEffect(() => {
    if (localStorage.getItem("role") === "admin") {
      fetchPosts();
    }
  }, [localStorage.getItem("role")]);

  useEffect(() => {
    fetchProfile()
  },[])

  const fetchPosts = () => {
    axios
      .get("http://localhost:8000/api/FilterNotice/", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => setPosts(response.data))
      .catch((error) => console.error(error));
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
      {showUpdateForm && selectedPost && (
        <UpdatePost data={selectedPost} onClose={handleCloseForm} fetchPosts={fetchPosts} />
      )}
      <div
        className={`${
          userProfile?.role === "student" && "h-[calc(100vh-100px)]"
        } flex justify-center items-center`}
      >
        <Card
          className={`${
            userProfile?.role  === "admin" ? "w-[90%]" : "w-[30%]"
          } my-2 shadow-md`}
        >
          <CardHeader>
            <CardTitle className="font-serif text-center">
              {userProfile?.role.toUpperCase()} PROFILE
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="mb-3">
            <div className="mx-auto flex items-center gap-12 w-[90%]">
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
                  {userProfile?.username}
                </p>
                <p className="font-medium">{userProfile?.email}</p>
              </div>
            </div>
            {userProfile?.role === 'student' && <div className="flex flex-col gap-[0.15rem]">
                <p className="font-medium"> {`${userProfile?.['first name']} ${userProfile?.['last name']}`}</p>
            </div>}
            </div>
            {userProfile?.role === 'student' && <div className="flex justify-between">
              <p><span className="font-medium">Semester</span> : {userProfile?.sem}</p>
              <p><span className="font-medium">Department</span> : {userProfile?.department}</p>
            </div>}
            {userProfile?.role === "admin" && (
              <>
                <div className="mt-2 p-2 w-[90%] mx-auto">
                  <Label className="text-[30px] ">NOTICES</Label>
                </div>
                <div
                  className={`mx-auto w-[90%] my-2 ${
                    posts.length > 0 && "grid grid-cols-1 sm:grid-cols-2 gap-4"
                  }`}
                >
                  {posts.length > 0 ? (
                    posts.map((post) => (
                      <PostCard
                        key={post.id}
                        data={post}
                        onUpdate={() => handleEditClick(post)}
                        onDelete={handleDelete}
                      />
                    ))
                  ) : (
                    <div className="flex w-full flex-col justify-center items-center">
                      <IoCameraOutline size={50} />
                      <p className="text-center font-semibold text-zinc-600">
                        NO NOTICES YET
                      </p>
                    </div>
                  )}
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
