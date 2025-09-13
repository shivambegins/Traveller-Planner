import React, { useEffect, useState } from "react";
// import { Button } from "C:/CODING/Project1/travel-itinerary-planner/src/components/ui/button";
// import { Button } from "../components/ui/button.jsx";
import { Button } from "../button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { googleLogout, useGoogleLogin } from "@react-oauth/google";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { FcGoogle } from "react-icons/fc";
import axios from "axios";
import { Link } from "react-router-dom";

function Header() {
  const user = JSON.parse(localStorage.getItem("user"));
  const [openDialog, setOpenDialog] = useState(false);

  useEffect(() => {
    console.log(user);
  }, []);

  const login = useGoogleLogin({
    onSuccess: (codeResp) => GetUserProfile(codeResp),
    onError: (error) => console.log(error),
  });

  const GetUserProfile = (tokenInfo) => {
    axios
      .get(
        `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenInfo?.access_token}`,
        {
          headers: {
            Authorization: `Bearer ${tokenInfo?.access_token}`,
            Accept: "Application/json",
          },
        }
      )
      .then((resp) => {
        console.log(resp);
        localStorage.setItem("user", JSON.stringify(resp.data));
        setOpenDialog(false);
        window.location.reload();
      });
  };

  return (
    <div
      style={{ backgroundColor: "#927440" }}
      className="shadow-2xl flex justify-between items-center px-2 md:px-4 border border-white rounded-full py-2 md:py-1"
    >
      {/* Logo */}
      <Link to="/">
        <img
          src="/Elogo.jpg"
          alt="Logo"
          className="h-[30px] sm:h-[35px] md:h-[40px] lg:h-[50px] rounded-full border border-white"
        />
      </Link>

      {/* Navigation & Profile */}
      <div className="flex items-center gap-2 md:gap-3">
        {user ? (
          <div className="flex items-center gap-2 md:gap-3">
            {/* Create Trip Button */}
            <Link to="/create-trip">
              <Button
                variant="outline"
                className="h-[30px] xs:w-[80px] s:w-[120px] sm:h-[35px] md:h-[40px]  rounded-full text-xs sm:text-sm md:text-base text-white bg-[#092744] hover:bg-black"
              >
                Make Trip+
              </Button>
            </Link>

            {/* My Trips Button */}
            <Link to="/my-trips">
              <Button
                variant="outline"
                className="h-[30px] xs:w-[80px] sm:h-[35px] md:h-[40px] rounded-full text-xs sm:text-sm md:text-base text-white bg-[#092744] hover:bg-black"
              >
                My Trips
              </Button>
            </Link>

            {/* User Profile Picture */}
            <Popover>
              <PopoverTrigger>
                <img
                  src={user?.picture.toString()}
                  alt="Profile"
                  className="h-[30px] w-[30px] sm:h-[35px] sm:w-[35px] md:h-[40px] md:w-[40px] lg:h-[50px] lg:w-[50px] rounded-full border border-white"
                />
              </PopoverTrigger>
              <PopoverContent>
                <h6
                  className="cursor-pointer text-center"
                  onClick={() => {
                    googleLogout();
                    localStorage.clear();
                    window.location.reload();
                  }}
                >
                  Logout
                </h6>
              </PopoverContent>
            </Popover>
          </div>
        ) : (
          // Sign-In Button
          <Button
            onClick={() => setOpenDialog(true)}
            className="rounded-full text-sm md:text-base bg-[#092744]"
          >
            Sign In
          </Button>
        )}
      </div>

      {/* Dialog for Google Sign-In */}
      <Dialog open={openDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogDescription className="text-center">
              <img
                src="/Elogo.jpg"
                alt="Logo"
                className="mx-auto h-[100px] rounded-full"
              />
              <h2 className="font-bold text-lg mt-5 ">Sign In with Google</h2>
              <p className="mt-2">
                Sign in to the app with Google Authentication
              </p>
              <Button
                onClick={login}
                className="mt-3 gap-3 items-center mx-auto bg-[#092744]"
              >
                <FcGoogle className="h-7 w-7 " /> Sign In with Google
              </Button>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default Header;