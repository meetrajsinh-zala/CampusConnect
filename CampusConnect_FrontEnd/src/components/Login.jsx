import React, { useState } from "react";
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
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
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

    // Form validation
    if (!formData.username || !formData.password) {
      setError("Please fill in all required fields.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:8000/api/login/", {
        username: formData.username,
        password: formData.password,
      });

      if (response.status === 200) {
        const { access, refresh, user } = response.data;
        localStorage.setItem("accessToken", access);
        localStorage.setItem("refreshToken", refresh);
        localStorage.setItem("username", user.username);
        localStorage.setItem("role", user.role);
        localStorage.setItem("email", user.email);
        navigate("/Home");
      }
    } catch (err) {
      console.error("Error during login:", err);
      setError("Invalid login credentials.");
    }
  };

  return (
    <div className="w-full h-screen flex justify-center items-center">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Login</CardTitle>
          <CardDescription>Welcome Back !</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-2">
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
            Login
          </Button>
          <p className="text-center">
            Already have an account?&nbsp;
            <Link to={"/SignUp"} className="text-[#1c284f] font-bold">
              Signup
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Login;
