import React from "react";
import { MdOutlineCalendarMonth } from "react-icons/md";
import Post from "@/app/_components/Post";
import GoBackButton from "@/app/_components/GoBackButton";
import prisma from "@/prisma/client";
import NavList from "./NavList";
import ProfileMainSection from "./ProfileMainSection";
import { Like, Post as PostType } from "@prisma/client";

const UserProfilePage = async({
  params: { profileId },
}: {
  params: { profileId: string };
}) => {


  const myTweets = await prisma.post.findMany({
        where: {
          userId: profileId,
        },
        include: {
          comments: true,
          likes: true,
          bookmarks: true,
        },
      });


    const likes = await prisma.like.findMany({
      where: {
        userId: profileId,
      },
      include: {
        post: {
          include: {
            comments: true,
            likes: true,
            bookmarks: true,
          }
        }
      }
    })

    let tweetsThatILiked: PostType[] = []
    likes.forEach((like) => {
      tweetsThatILiked.push(like.post)
    })


    const replies = await prisma.comment.findMany({
      where: {
        userId: profileId,
      },
      include: {
        post: {
          include: {
            comments: true,
            likes: true,
            bookmarks: true,
          }
        }
      }
    })

    let tweetsThatIReplied: PostType[] = []
    replies.forEach((reply) => {
      tweetsThatIReplied.push(reply.post)
    })

  return (
    <div className=" w-6/12 border-l border-r border-zinc-700 h-full min-h-screen ">
      {/* Top User + No. of posts section */}
      <div className="p-2 px-4 border-t border-b border-zinc-700 sticky top-0 backdrop-blur">
        <div className="flex space-x-8 items-center">
          {/* Go Back Button Here */}
          <GoBackButton />
          <div>
            <h1 className="font-bold">iffu</h1>
            <h1 className="text-xs font-thin">{myTweets.length} posts</h1>
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

      <ProfileMainSection myTweets={myTweets} likedTweets={tweetsThatILiked as any} repliedTweets={tweetsThatIReplied as any} />
      
    </div>
  );
};

export default UserProfilePage;