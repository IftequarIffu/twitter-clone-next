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

const Timeline = async() => {
  // const [allTweets, setAllTweets] = useState<PostType[] | null>(null)
  

  

  // useEffect(() => {
  //   const getTweets = async () => {
  //     try {
  //       const response = await axios.get<PostType[]>("/api/tweets");
  //       const tweets = response.data
  //       setAllTweets(tweets)
  //     } catch (error) {
  //       console.log(" Error");
  //       throw new Error("Error");
  //     }
  //   };



  //   const tweets = getTweets();
  // }, []);

  const allTweets = await prisma.post.findMany()

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
        allTweets?.map((tweet) => (
          <Post key={tweet.id} post={tweet} />
        ))
      }
    </div>
  );
};

export default Timeline;
