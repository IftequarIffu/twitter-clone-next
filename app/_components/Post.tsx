"use client";

import React from "react";
import { BiMessageRounded } from "react-icons/bi";
import { FaRetweet, FaRegBookmark, FaBook } from "react-icons/fa6";
import { FaRegHeart } from "react-icons/fa";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useState } from "react";
import TweetInputBox from "./TweetInputBox";
import ReplyModal from "./ReplyModal";
import { FaHeart } from "react-icons/fa";
import { FaBookmark } from "react-icons/fa";
import { likeAPost, unlikeAPost } from "../actions/likes";
import { bookmarkAPost, unbookmarkAPost } from "../actions/bookmarks";
import { PostType } from "../types/PrismaTypes";
import Image from "next/image";

const Post = ({
  post,
  isLiked,
  isBookmarked,
}: {
  post: PostType;
  isLiked: boolean;
  isBookmarked: boolean;
}) => {
  const { status, data: session } = useSession();
  const [replies, setReplies] = useState();

  // Understand this carefully.
  // If you use useState like the line below, when you click the like button,
  // you will have to refresh the page to see the updated number of likes.
  // const [likes, setLikes] = useState<typeof post.likes>(post.likes)
  const likes = post.likes;
  // const [bookmarks, setBookmarks] = useState<typeof post.bookmarks>(post.bookmarks)
  const bookmarks = post.bookmarks;
  // const [comments, setComments] = useState<typeof post.comments>(post.comments)
  const comments = post.comments;

  const [isReplyModalOpen, setReplyModalOpen] = useState(false);

  const handleOpenReplyModal = () => {
    setReplyModalOpen(true);
  };

  const handleCloseReplyModal = () => {
    setReplyModalOpen(false);
  };

  const likeOrUnlike = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    post: PostType
  ) => {
    if (!isLiked) {
      try {
        const newlike = await likeAPost(post.id);
        console.log(newlike);
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        const newunlike = await unlikeAPost(post.id);
        console.log(newunlike);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const bookmarkOrUnbookmark = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    post: PostType
  ) => {
    try {
      if (!isBookmarked) {
        bookmarkAPost(post.id);
      } else {
        unbookmarkAPost(post.id);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="border-b border-zinc-700">
      <div className="flex ">
        <div className="p-4">
          <div className="h-10 w-10 rounded-full overflow-hidden bg-teal-800"></div>
        </div>

        <div className="flex">
          <div className="p-4 ps-2 text-justify overflow-hidden">
            <Link href={`/posts/${post.id}`}>
              <div className="break-all">{post?.body}</div>
            </Link>
              {
                post.imageUrl && <Image src={post.imageUrl} className="rounded-xl mt-4" height={800} width={800} alt="postImage" priority/>
              }
            <div className="mt-4 flex justify-start space-x-8 items-center text-zinc-500">
              <div
                className="flex space-x-2 items-center hover:text-primary hover:cursor-pointer"
                onClick={handleOpenReplyModal}
              >
                <BiMessageRounded size={20} />
                <h1 className="text-sm">{comments?.length}</h1>
              </div>

              {/* <button onClick={(e) => retweet(e, post)}>
            <div className="flex space-x-2 items-center">
              <FaRetweet size={20} />
              <h1 className="text-sm">1</h1>
            </div>
          </button> */}

              <button
                onClick={(e) => likeOrUnlike(e, post)}
                className="hover:text-red-700"
              >
                <div className="flex space-x-2 items-center">
                  {isLiked ? (
                    // <div className="text-red-700">
                    <FaHeart size={17} color="red" />
                  ) : (
                    // </div>
                    <FaRegHeart size={17} />
                  )}
                  <h1 className="text-sm">{likes?.length}</h1>
                </div>
              </button>

              <button onClick={(e) => bookmarkOrUnbookmark(e, post)}>
                <div className="flex space-x-2 items-center hover:text-green-600 hover:cursor-pointer">
                  {isBookmarked ? (
                    <FaBookmark size={17} color="green" />
                  ) : (
                    <FaRegBookmark size={17} />
                  )}
                  <h1 className="text-sm">{bookmarks?.length}</h1>
                </div>
              </button>
            </div>
          </div>
        </div>
        <ReplyModal
          isOpen={isReplyModalOpen}
          onClose={handleCloseReplyModal}
          postId={post.id}
        />
      </div>
    </div>
  );
};

export default Post;
