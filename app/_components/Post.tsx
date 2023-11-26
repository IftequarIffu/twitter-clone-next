'use client';

import React from "react";
import { Post } from "@prisma/client";
import { BiMessageRounded } from "react-icons/bi";
import { FaRetweet, FaRegBookmark } from "react-icons/fa6";
import { FaRegHeart } from "react-icons/fa";
import Link from "next/link";
import axios from "axios";

const Post = ({ post }: { post: Post }) => {


  const retweet = async(e: React.MouseEvent<HTMLButtonElement, MouseEvent>, post: Post) => {
    e.preventDefault()
    try {
      const newPost = await axios.get(`/api/tweets/retweet/${post.id}`)
      console.log(newPost)
      
    } catch (error) {
      console.log(error)
    }
  }



  return (
    <div className="flex border-b border-zinc-700">
      <div className="p-4">
        <div className="h-10 w-10 rounded-full overflow-hidden bg-teal-800"></div>
      </div>

      <div className="flex">
        <div className="p-4 ps-2 text-justify overflow-hidden">
          <Link href={`/posts/${post.id}`}>
            <div className="break-all">{post?.body}</div>
          </Link>
          <div className="mt-4 flex justify-start space-x-8 items-center text-zinc-500">
          <Link href={`/posts/${post.id}/replies`}>
            <div className="flex space-x-2 items-center">
              <BiMessageRounded size={20} />
              <h1 className="text-sm">2</h1>
            </div>
          </Link>

          {/* <button onClick={(e) => retweet(e, post)}>
            <div className="flex space-x-2 items-center">
              <FaRetweet size={20} />
              <h1 className="text-sm">1</h1>
            </div>
          </button> */}

            <div className="flex space-x-2 items-center">
              <FaRegHeart size={17} />
              <h1 className="text-sm">5</h1>
            </div>

            <div className="flex space-x-2 items-center">
              <FaRegBookmark size={17} />
              <h1 className="text-sm">5</h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;
