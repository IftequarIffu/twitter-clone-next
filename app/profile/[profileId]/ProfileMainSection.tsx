'use client'
import React from 'react'
import prisma from '@/prisma/client';
import Post from '@/app/_components/Post';
import { useState } from 'react';
import NavList from './NavList';
import { Comment as CommentType } from '@prisma/client';
import { Like as LikeType } from '@prisma/client';
import { PostType } from '@/app/types/PrismaTypes';
import { useSession } from 'next-auth/react';

const ProfileMainSection = ({myTweets, likedTweets, repliedTweets }: {myTweets: PostType[], likedTweets: PostType[], repliedTweets: PostType[]}) => {

    
  const [selectedTab, setSelectedTab] = useState("posts");

  const { status, data: session } = useSession();

  // if(selectedTab === "posts")
  //   console.log("My tweets:", myTweets)
  // else if(selectedTab === "likes")
  //   console.log("My liked tweets:", likedTweets)
  // else if(selectedTab === "replies")
  //   console.log("My replied tweets:", repliedTweets)

  return (
    <div>
    {/* NavList of profile page (Posts, Replies, Likes) */}

    <NavList selectedTab={selectedTab} setSelectedTab={setSelectedTab}/>
    {
    selectedTab === "posts" &&
    myTweets?.map((post) => {
      const isLiked = post.likes?.some(item => item.hasOwnProperty('userId') && item.userId === session?.user.id);
      const isBookmarked = post.bookmarks?.some(item => item.hasOwnProperty('userId') && item.userId === session?.user.id);
      return (<Post key={post.id} post={post} isLiked={isLiked} isBookmarked={isBookmarked} />)
      
    })
    }

    {
    selectedTab === "replies" &&
    repliedTweets?.map((post) => {
      const isLiked = post.likes?.some(item => item.hasOwnProperty('userId') && item.userId === session?.user.id);
      const isBookmarked = post.bookmarks?.some(item => item.hasOwnProperty('userId') && item.userId === session?.user.id);
      return (<Post key={post.id} post={post} isLiked={isLiked} isBookmarked={isBookmarked} />)
      
    })
    }

    {
    selectedTab === "likes" &&
    likedTweets?.map((post) => {
      const isLiked = post.likes?.some(item => item.hasOwnProperty('userId') && item.userId === session?.user.id);
      const isBookmarked = post.bookmarks?.some(item => item.hasOwnProperty('userId') && item.userId === session?.user.id);
      return (<Post key={post.id} post={post} isLiked={isLiked} isBookmarked={isBookmarked} />)
      
    })
    }
    </div>
  )
}

export default ProfileMainSection