import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";

import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Textarea } from "@/components/ui/textarea";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UpdatePost = ({ data, onClose, fetchPosts }) => {
  const [department, setDepartment] = useState(data.department || "");
  const [description, setDescription] = useState(data.description || "");
  const [image, setImage] = useState(null);
  const token = localStorage.getItem("accessToken");

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("department", department);
    formData.append("description", description);
    if (image) formData.append("image", image);

    try {
      const response = await axios.put(
        `http://localhost:8000/api/notice-update/${data.id}/`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("Post updated successfully:", response.data);
      toast.success("Successfully updated Post...", {
        position: "bottom-right",
      });
      fetchPosts();
    } catch (error) {
      console.error("Error updating post:", error.response.data);
      setErrors(error.response.data);
    }
  };

  return (
    <div className="fixed w-full h-full bg-[#fff] z-10">
      <ToastContainer />
      <Card className="w-[350px] mx-auto my-14">
        <CardHeader className="flex flex-row justify-between items-center">
          <CardTitle>Update Post</CardTitle>
          <button onClick={onClose}>X</button>
        </CardHeader>

        <CardContent className="flex flex-col gap-2">
          <div className="flex flex-col gap-2">
            <Label>Department</Label>
            <Input
              type="text"
              placeholder="Notice Department"
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
            />
          </div>

          <div className="flex flex-col gap-2">
            <Label>Image</Label>
            <Input type="file" onChange={handleImageChange} />
          </div>

          <div className="flex flex-col gap-2">
            <Label>Description</Label>
            <Textarea
              rows={7}
              placeholder="Notice Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
        </CardContent>

        <CardFooter className="flex flex-col gap-1">
          <Button className="w-full" onClick={handleSubmit}>
            Update Post
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default UpdatePost;
