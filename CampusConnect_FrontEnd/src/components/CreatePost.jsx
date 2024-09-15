import React, { useState } from "react";
import {
  Card,
  CardContent,
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

const CreatePost = ({ Data }) => {
  const ShowForm = Data?.ShowForm;
  const fetchNotice = Data.fetchNotice;
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [department, setDepartment] = useState("");

  const handlesubmit = async () => {
    const formData = new FormData();
    formData.append("department", department);
    formData.append("description", description);
    if (image) {
      formData.append("image", image);
    }

    try {
      const token = localStorage.getItem("accessToken");
      const response = await axios.post(
        "http://localhost:8000/api/notices/",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Post created:", response.data);
      toast.success("Notice Created Successfully...", {
        position: "bottom-right",
      });
      fetchNotice();
    } catch (error) {
      console.error("Error creating post:", error.response.data);
    }
  };
  return (
    <div className="absolute w-full bg-white z-10">
      <ToastContainer />
      <Card className="w-[450px] mx-auto my-14">
        <CardHeader className="flex flex-row justify-between items-center">
          <CardTitle>Create Post</CardTitle>
          <button onClick={ShowForm}>X</button>
        </CardHeader>
        <CardContent className="flex flex-col gap-2">
          <div className="flex flex-col gap-2">
            <Label>Department</Label>
            <Input
              type="text"
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
              placeholder="Notice Department"
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label>Image</Label>
            <Input type="file" onChange={(e) => setImage(e.target.files[0])} />
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
          <Button className="w-full" onClick={handlesubmit}>
            Create Post
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default CreatePost;
