"use client";
import Link from "next/link";

import React from "react";
import { FaXTwitter } from "react-icons/fa6";
import { GoHome } from "react-icons/go";
import {  AiOutlineBell } from "react-icons/ai";
import { BiEnvelope, BiDotsHorizontalRounded, BiLogOut } from "react-icons/bi";
import { HiOutlineUser } from "react-icons/hi2";
import { RxAvatar } from "react-icons/rx";
import LoginModal from "./LoginModal";

const LeftBar = () => {
  const NavList = [
    {
      title: "Home",
      icon: GoHome,
    },
    {
      title: "Notifications",
      icon: AiOutlineBell,
    },
    {
      title: "Messages",
      icon: BiEnvelope,
    },
    {
      title: "Profile",
      icon: HiOutlineUser,
    },
    {
      title: "Logout",
      icon: BiLogOut,
    },
  ];

  return (
    <div className="w-3/12 z-10 sticky top-0 h-screen min-h-full  flex justify-center p-4">
      <div className=" flex flex-col justify-between">

        {/* Top Section of Logo + Nav + New Post Button */}
        <div>
          <Link href={"/"} className="inline-block"><FaXTwitter size={30} /></Link>
          
            <div className="flex flex-col space-y-4 mt-6 ">
              {NavList.map((item) => (
                <Link
                  href={item.title.toLocaleLowerCase() === "home" ? "/" : `/${item.title.toLocaleLowerCase()}`}
                  key={item.title}
                  className="hover:bg-zinc-700 py-2 px-3 rounded-3xl"
                >
                  <div className="flex items-center space-x-3">
                    <div>
                      <item.icon size={25} />
                    </div>
                    <div className="font-light text-lg">{item.title}</div>
                  </div>
                </Link>
              ))}
              <Link href={"/new-post"}>
                <div className="rounded-3xl text-center py-3 bg-primary hover:bg-opacity-70">
                  Tweet
                </div>
              </Link>
            </div>
            {/* <LoginModal /> */}
        </div>


        {/* Bottom Account section */}
        <div className="flex items-center space-x-2">
          <div>
            <RxAvatar size={43} />
          </div>
          <div className="flex-col items-center">
            <h1 className="">iffu</h1>
            <p className="font-thin text-sm text-zinc-300 tracking-wider">@IftequarAhmed</p>
          </div>
          <div className="ps-6">
            <BiDotsHorizontalRounded  size={20}/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeftBar;
