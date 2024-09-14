import React from 'react'
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
import { Textarea } from "@/components/ui/textarea"

const Createpost = () => {
  return (
    <div>
    <Card className="w-[450px] mx-auto my-14">
        <CardHeader>
          <CardTitle>Create Post</CardTitle>
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
            <Textarea rows={7} placeholder="Notice Description" />
          </div>
        </CardContent>
        <CardFooter className="flex flex-col gap-1">
          <Button className="w-full">Create Post</Button>
        </CardFooter>
      </Card>
    </div>
  )
}

export default Createpost