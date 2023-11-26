import React from "react";
import { MdOutlineCalendarMonth } from "react-icons/md";
import Post from "@/app/_components/Post";
import GoBackButton from "@/app/_components/GoBackButton";
import prisma from "@/prisma/client";
import NavList from "./NavList";

const UserProfilePage = async ({
  params: { profileId },
}: {
  params: { profileId: string };
}) => {
  const myTweets = await prisma.post.findMany({
    where: {
      userId: profileId,
    },
  });

  return (
    <div className=" w-6/12 border-l border-r border-zinc-700 h-full min-h-screen ">
      {/* Top User + No. of posts section */}
      <div className="p-2 px-4 border-t border-b border-zinc-700 sticky top-0 backdrop-blur">
        <div className="flex space-x-8 items-center">
          {/* Go Back Button Here */}
          <GoBackButton />
          <div>
            <h1 className="font-bold">iffu</h1>
            <h1 className="text-xs font-thin">244 posts</h1>
          </div>
        </div>
      </div>
      <div className="bg-zinc-800 h-48"></div>

      <div className="p-4">
        <h1 className="text-xl font-bold">iffu</h1>
        <h1 className="font-thin">@IftequarAhmed</h1>
        <p className="mt-4 font-light text-sm">
          Software Engineer at Deloitte | Talks about Web3, Software Engineering
        </p>
        <div className="mt-2 flex items-center space-x-1">
          <MdOutlineCalendarMonth />
          <p className="font-light text-sm">Joined March 2016</p>
        </div>
        <div className="mt-4 flex items-center space-x-4">
          <p className="font-light text-sm">
            {" "}
            <span className="font-medium">145</span> Followers
          </p>
          <p className="font-light text-sm">
            {" "}
            <span className="font-medium">145</span> Following
          </p>
        </div>
      </div>

      {/* NavList of profile page (Posts, Replies, Likes) */}
      <NavList />

      {/* User's posts */}

      {myTweets?.map((tweet) => (
        <Post key={tweet.id} post={tweet} />
      ))}
    </div>
  );
};

export default UserProfilePage;
