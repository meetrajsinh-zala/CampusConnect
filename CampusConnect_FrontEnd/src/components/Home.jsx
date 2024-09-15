import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import CreatePost from "./CreatePost";
import HomePostCard from "./HomePostCard";
import axios from "axios";

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
      {notices.map((notice) => (
        <HomePostCard key={notice.id} notice={notice} /> // Pass the notice object to HomePostCard
      ))}
    </>
  );
};

export default Home;
