import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import CreatePost from "./CreatePost";
import HomePostCard from "./HomePostCard";
import axios from "axios";
import { IoCameraOutline } from "react-icons/io5";

const Home = () => {
  const [ShowCreatePost, setShowCreatePost] = useState(false);
  const [notices, setNotices] = useState([]);

  const ChangeVisibility = () => {
    setShowCreatePost(!ShowCreatePost);
  };

  const fetchNotices = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      const response = await axios.get("http://localhost:8000/api/notices/", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setNotices(response.data);
    } catch (error) {
      console.error("Error fetching notices:", error);
    }
  };

  useEffect(() => {
    fetchNotices();
  }, []);

  return (
    <>
      <Navbar Data={{ ShowForm: ChangeVisibility }} />
      {ShowCreatePost && (
        <CreatePost
          Data={{ ShowForm: ChangeVisibility, fetchNotice: fetchNotices }}
        />
      )}
      {notices.length > 0 ? (
        notices.map((notice) => (
          <HomePostCard key={notice.id} notice={notice} />
        ))
      ) : (
        <div className="flex w-full h-[calc(100vh-100px)] flex-col justify-center items-center">
          <IoCameraOutline size={50} />
          <p className="text-center font-semibold text-zinc-600">
            NO NOTICES YET
          </p>
        </div>
      )}
    </>
  );
};

export default Home;
