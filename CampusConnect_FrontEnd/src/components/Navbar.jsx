import React, { useState } from "react";
import "../index.css";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useNavigate, Link } from "react-router-dom";

const Navbar = ({ Data }) => {
  const ShowForm = Data?.ShowForm;

  const navigate = useNavigate();
  const Logout = () => {
    localStorage.clear();
    navigate("/Login");
  };
  const ShowBtn = () => {
    if (
      (localStorage.getItem("role") === "admin") &
      (window.location.pathname === "/Home")
    ) {
      return (
        <DropdownMenuRadioItem value="Create Post" onClick={ShowForm}>
          Create Post
        </DropdownMenuRadioItem>
      );
    }
  };

  const [action, setAction] = useState("");
  return (
    <div className="flex justify-between p-4 shadow-sm shadow-gray-500 sticky top-0 bg-white z-50">
      <div className="text-[30px] font-sans cursor-pointer">
        <Link to={"/Home"}>CAMPUS CONNECT</Link>
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Avatar className="cursor-pointer">
            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-auto mx-2">
          <DropdownMenuLabel>
            Hello, {localStorage.getItem("username")}
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuRadioGroup value={action} onValueChange={setAction}>
            <DropdownMenuRadioItem
              value="Home"
              onClick={() => {
                navigate("/Home");
              }}
            >
              Home
            </DropdownMenuRadioItem>
            <DropdownMenuRadioItem
              value="profile"
              onClick={() => {
                navigate("/Profile");
              }}
            >
              Profile
            </DropdownMenuRadioItem>
            {ShowBtn()}
            <DropdownMenuRadioItem value="logout" onClick={Logout}>
              Logout
            </DropdownMenuRadioItem>
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default Navbar;
