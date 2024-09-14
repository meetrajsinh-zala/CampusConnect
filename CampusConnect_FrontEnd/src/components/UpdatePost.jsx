import React from "react";
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

const UpdatePost = ({Data}) => {
  const ShowForm = Data?.ShowForm
  return (
    <div className="absolute w-full bg-white h-screen z-10">
      <Card className="w-[350px] mx-auto my-14">
        <CardHeader className="flex flex-row justify-between items-center">
          <CardTitle>Update Post</CardTitle>
          <button onClick={ShowForm}>X</button>
        </CardHeader>

        <CardContent className="flex flex-col gap-2">
          <div className="flex flex-col gap-2">
            <Label>Title</Label>
            <Input type="text" placeholder="Notice Title" />
          </div>

          <div className="flex flex-col gap-2">
            <Label>Image</Label>
            <Input type="file" />
          </div>

          <div className="flex flex-col gap-2">
            <Label>Description</Label>
            <Textarea type="email" placeholder="Notice Description" />
          </div>
        </CardContent>

        <CardFooter className="flex flex-col gap-1">
          <Button className="w-full">Update Post</Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default UpdatePost;
