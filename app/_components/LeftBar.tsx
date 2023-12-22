"use client";
import Link from "next/link";
import { useState } from "react";
import React from "react";
import { FaXTwitter } from "react-icons/fa6";
import { GoHome } from "react-icons/go";
import {  AiOutlineBell } from "react-icons/ai";
import { FaRegBookmark } from "react-icons/fa";
import { BiEnvelope, BiDotsHorizontalRounded, BiLogOut, BiLogIn } from "react-icons/bi";
import { HiOutlineUser } from "react-icons/hi2";
import { RxAvatar } from "react-icons/rx";
import AuthModal from "./AuthModal";
import { useSession } from "next-auth/react";
import LeftBarNavLink from "./LeftBarNavLink";

const LeftBar = () => {
  const NavList = [
    {
      title: "Home",
      Icon: GoHome,
    },

    // {
    //   title: "Notifications",
    //   Icon: AiOutlineBell,
    // },
    // {
    //   title: "Messages",
    //   Icon: BiEnvelope,
    // }
    // {
    //   title: "Profile",
    //   icon: HiOutlineUser,
    // },
    // {
    //   title: "Logout",
    //   icon: BiLogOut,
    // },
  ];

  const {status, data:session}  = useSession()

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="w-3/12 z-10 sticky top-0 h-screen min-h-full  flex justify-center p-4">
      <div className=" flex flex-col justify-between">

        {/* Top Section of Logo + Nav + New Post Button */}
        <div>
          <Link href={"/"} className="inline-block"><FaXTwitter size={30} /></Link>
          
            <div className="flex flex-col space-y-4 mt-6 ">
              {NavList.map((item) => (
                  <LeftBarNavLink key={item.title} title={item.title} Icon={item.Icon}/>
              ))}
              {
                session && <LeftBarNavLink title={"Profile"} Icon={HiOutlineUser} linkTo={`/profile/${session.user!.id}`}/>
              }
              {
                session && <LeftBarNavLink title={"Bookmarks"} Icon={FaRegBookmark} linkTo={`/profile/${session.user!.id}/bookmarks`}/>
              }
              {
                session && <LeftBarNavLink title={"Logout"} Icon={BiLogOut} linkTo="/api/auth/signout" />
              }
              {
                !session && 

                <div className="flex items-center space-x-4 hover:cursor-pointer rounded-3xl hover:bg-zinc-700 py-2 px-2" onClick={handleOpenModal}>
                  <BiLogIn size={30} />
                  <h1>Login</h1>
                </div>
              }
              {
                session && <Link href={"/new-post"}>
                <div className="rounded-3xl text-center py-3 bg-primary hover:bg-opacity-70">
                  Tweet
                </div>
              </Link>
              }
              
            </div>
            {/* <LoginModal /> */}
        </div>


        {/* Bottom Account section */}
        {
          session && (
            <div className="flex items-center space-x-2">
          <div>
            <RxAvatar size={43} />
          </div>
          <div className="flex-col items-center">
            <h1 className="">{session ? session.user.name : "iffu"}</h1>
            <p className="font-thin text-sm text-zinc-300 tracking-wider">@{session.user.name}</p>
          </div>
          <div className="ps-6">
            <BiDotsHorizontalRounded  size={20}/>
          </div>
        </div>
          )
        }
        
      </div>
      <AuthModal
           isModalOpen={isModalOpen}
           handleCloseModal={handleCloseModal} 
      />
    </div>
  );
};

export default LeftBar;
