import React,{useState} from "react";
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

const Nav = () => {
    const [action, setAction] = useState("");
  return (
    <div className="flex justify-between p-4 shadow-sm shadow-gray-500">
      <div className="text-[30px] font-sans">CAMPUS CONNECT</div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-auto mx-2">
          <DropdownMenuLabel>Hello, Username</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuRadioGroup value={action} onValueChange={setAction}>
            <DropdownMenuRadioItem value="profile">Profile</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="logout">
              Logout
            </DropdownMenuRadioItem>
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default Nav;
