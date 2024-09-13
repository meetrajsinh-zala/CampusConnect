import React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from './ui/card';
import {Label} from './ui/label';
import {Input} from './ui/input';
import {Button} from './ui/button';
import {Link} from 'react-router-dom';

const Login = () => {
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
            <Input type="text" placeholder="EX : johndeo12" />
          </div>
          <div className="flex flex-col gap-2">
            <Label>Password</Label>
            <Input type="password" placeholder="*******" />
          </div>
        </CardContent>
        <CardFooter className="flex flex-col gap-1">
          <Button className="w-full">Login</Button>
          <p className="text-center">
            Already have an account?&nbsp;
            <Link to={'/SignUp'} className="text-[#1c284f] font-bold">
              Signup
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Login;
