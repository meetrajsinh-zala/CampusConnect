import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const SignUp = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
    role: "",
  });

  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Form validation can be added here
    if (!formData.username || !formData.password || !formData.email) {
      setError("Please fill in all required fields.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:8000/api/signup/", {
        user: {
          username: formData.username,
          email: formData.email,
          password: formData.password,
          first_name: formData.firstName,
          last_name: formData.lastName,
        },
        role: formData.role,
      });

      if (response.status === 201) {
        navigate("/login");
      }
    } catch (err) {
      console.error("Error during sign-up:", err);
      setError("Failed to create account. Please try again.");
    }
  };

  return (
    <div className="w-full h-screen flex justify-center items-center">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Sign Up</CardTitle>
          <CardDescription>Welcome !</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-2">
          <div className="flex flex-col gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">Select-Role</Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                <DropdownMenuLabel>Role</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuRadioGroup
                  value={formData.role}
                  onValueChange={(value) =>
                    setFormData({ ...formData, role: value })
                  }
                >
                  <DropdownMenuRadioItem value="admin">
                    Admin
                  </DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="student">
                    Student
                  </DropdownMenuRadioItem>
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <div className="flex flex-col gap-2">
            <Label>First Name</Label>
            <Input
              type="text"
              name="firstName"
              placeholder="EX: John"
              value={formData.firstName}
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label>Last Name</Label>
            <Input
              type="text"
              name="lastName"
              placeholder="EX: Doe"
              value={formData.lastName}
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label>Username</Label>
            <Input
              type="text"
              name="username"
              placeholder="EX: johndoe12"
              value={formData.username}
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label>Email</Label>
            <Input
              type="email"
              name="email"
              placeholder="test@example.com"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label>Password</Label>
            <Input
              type="password"
              name="password"
              placeholder="*******"
              value={formData.password}
              onChange={handleChange}
            />
          </div>
        </CardContent>
        <CardFooter className="flex flex-col gap-1">
          <Button className="w-full" onClick={(e) => handleSubmit(e)}>
            Sign up
          </Button>
          <p className="text-center">
            Don't have an account?&nbsp;
            <Link to={"/Login"} className="text-[#1c284f] font-bold">
              Login
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default SignUp;