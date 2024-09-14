import React from "react";
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
import { Link } from "react-router-dom";

const SignUp = () => {
  const [position, setPosition] = useState("bottom");
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
                  value={position}
                  onValueChange={setPosition}
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
            <Input type="text" placeholder="EX : John" />
          </div>
          <div className="flex flex-col gap-2">
            <Label>Last Name</Label>
            <Input type="text" placeholder="EX : Doe" />
          </div>
          <div className="flex flex-col gap-2">
            <Label>Username</Label>
            <Input type="text" placeholder="EX : johndeo12" />
          </div>
          <div className="flex flex-col gap-2">
            <Label>Email</Label>
            <Input type="email" placeholder="test@example.com" />
          </div>
          <div className="flex flex-col gap-2">
            <Label>Password</Label>
            <Input type="password" placeholder="*******" />
          </div>
        </CardContent>
        <CardFooter className="flex flex-col gap-1">
          <Button className="w-full">Sign up</Button>
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
