import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const userLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("https://workasana-seven.vercel.app/api/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(userData),
      });

      if (!res.ok) {
        console.log("Error while doing login");
        return;
      }
      navigate("/dashboard");
    } catch (error) {
      console.log("Error");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 sm:px-0">
      <Card className="w-full max-w-sm sm:max-w-md">
        <CardHeader>
          <CardTitle className="text-center text-xl sm:text-2xl">
            Login to your account
          </CardTitle>
          <CardDescription className="text-center">
            Enter email and pass below to login to your account
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={userLogin}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="abc@example.com"
                  value={userData.email}
                  required
                  onChange={(e) => {
                    setUserData({ ...userData, email: e.target.value });
                  }}
                />
              </div>

              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                </div>
                <Input
                  id="password"
                  type="password"
                  value={userData.password}
                  required
                  onChange={(e) => {
                    setUserData({ ...userData, password: e.target.value });
                  }}
                />
              </div>

              <Button type="submit" className="w-full cursor-pointer">
                Login
              </Button>
            </div>
          </form>
        </CardContent>

        <CardFooter className="flex-col gap-2">
          <CardAction>
            <Link to={"/signUp"}>
              <Button variant="link" className="cursor-pointer">
                New here? Sign Up
              </Button>
            </Link>
          </CardAction>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Login;
