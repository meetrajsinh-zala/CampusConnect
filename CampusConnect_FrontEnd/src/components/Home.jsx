import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import CreatePost from "./CreatePost";
import HomePostCard from "./HomePostCard";
import axios from "axios";
import { IoCameraOutline } from "react-icons/io5";
import { Input } from "./ui/input";

const Home = () => {
  const [ShowCreatePost, setShowCreatePost] = useState(false);
  const [notices, setNotices] = useState([]);
  const [filteredNotices, setFilteredNotices] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

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
      setFilteredNotices(response.data);
    } catch (error) {
      console.error("Error fetching notices:", error);
    }
  };

  useEffect(() => {
    fetchNotices();
  }, []);

  const handleSearch = (e) => {
    const searchTerm = e.target.value;
    setSearchTerm(searchTerm);

    if (searchTerm === "") {
      setFilteredNotices(notices);
    } else {
      const filtered = notices.filter((notice) =>
        notice.department.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredNotices(filtered);
    }
  };

  return (
    <>
      <Navbar Data={{ ShowForm: ChangeVisibility }} />
      {ShowCreatePost && (
        <CreatePost
          Data={{ ShowForm: ChangeVisibility, fetchNotice: fetchNotices }}
        />
      )}
      <div className="w-full sm:w-[75%] lg:w-[50%] mx-auto my-2">
        {notices.length > 0 && (
          <Input
            type="text"
            placeholder="Filter Based On Department"
            value={searchTerm}
            onChange={handleSearch}
          />
        )}
      </div>
      {notices.length > 0 ? (
        filteredNotices.map((notice) => (
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
