"use client";
import React from "react";
import { useState } from "react";



// NavList which contains tabs for Posts, Replies, Likes in profile page

const NavList = ({ selectedTab, setSelectedTab } : { selectedTab: string, setSelectedTab: React.Dispatch<React.SetStateAction<string>> }) => {

  const navList = [{ title: "Posts" }, { title: "Replies" }, { title: "Likes" }];
  
  return (
    <div className="px-4 mt-4 border-b border-zinc-300 flex justify-around items-center">
      {navList.map((navItem) => (
        <div
          key={navItem.title}
          className={`hover:cursor-pointer py-3 px-3  ${
            selectedTab === navItem.title.toLowerCase()
              ? "border-b-8 border-primary"
              : ""
          }`}
          onClick={(e) => setSelectedTab(navItem.title.toLocaleLowerCase())}
        >
          {navItem.title}
        </div>
      ))}
    </div>
  );
};

export default NavList;
