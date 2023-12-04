import React, { useEffect } from "react";
import Post from "./Post";
import useAutosizeTextArea from "./useAutosizeTextArea";
import { useRef, useState } from "react";
import axios from "axios";
import { Post as PostType } from "@prisma/client";
import TweetInputBox from "./TweetInputBox";
import CreateTweetButton from "./CreateTweetButton";
import NewTweetSection from "./NewTweetSection";
import prisma from "@/prisma/client";
import { getAllPosts } from "../actions/posts";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/authOptions";

const Timeline = async() => {

  const allPosts = await getAllPosts()
  const session = await getServerSession(authOptions)
  const loggedInUserId = await session?.user.id

  return (
    <div className=" w-6/12 border-l border-r border-zinc-700 h-full min-h-screen ">
      {/* Top Home section */}
      <div className="font-bold p-5 border-t border-b border-zinc-700 sticky top-0 backdrop-blur">
        Home
      </div>

      {/*  Make a new tweet section */}
      <NewTweetSection />

      {/* List of tweets */}
      {
        allPosts?.map((post) => {
          const isLiked = post.likes.some(item => item.hasOwnProperty('userId') && item.userId === loggedInUserId);
          const isBookmarked = post.bookmarks.some(item => item.hasOwnProperty('userId') && item.userId === loggedInUserId);
          return (<Post key={post.id} post={post} isLiked={isLiked} isBookmarked={isBookmarked} />)
        }
          
        )
      }
    </div>
  );
};
export const revalidate = 0;
export default Timeline;
