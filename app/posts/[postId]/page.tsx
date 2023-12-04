import React from "react";
import GoBackButton from "@/app/_components/GoBackButton";
import Post from "@/app/_components/Post";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/auth/authOptions";
import { CommentType, PostType } from "@/app/types/PrismaTypes";
import { getPostById } from "@/app/actions/posts";
import Comment from "@/app/_components/Comment";



const PostPage = async ({
  params: { postId },
}: {
  params: { postId: string };
}) => {
  const post = await getPostById(postId);
  const session = await getServerSession(authOptions);
  const loggedInUserId = await session?.user.id;

  const isLiked = post?.likes.some(
    (item) => item.hasOwnProperty("userId") && item.userId === loggedInUserId
  );
  const isBookmarked = post?.bookmarks.some(
    (item) => item.hasOwnProperty("userId") && item.userId === loggedInUserId
  );

  return (
    <div className=" w-6/12 border-l border-r border-zinc-700 h-full min-h-screen ">
      <div className="p-2 px-4 border-t border-b border-zinc-700 sticky top-0 backdrop-blur">
        <div className="flex space-x-8 items-center">
          {/* Go Back Button Here */}
          <GoBackButton />
          <div>
            <h1 className="font-bold">Post</h1>
            {/* <h1 className="text-xs font-thin">244 posts</h1> */}
          </div>
        </div>
      </div>
      <Post
        key={post?.id}
        post={post as PostType}
        isLiked={isLiked as boolean}
        isBookmarked={isBookmarked as boolean}
      />
      {
        post?.comments.length !== 0 ? post?.comments.map((comment) => {
            return (
                <Comment key={comment.id} comment={comment as CommentType} />
            )
        }) : 
        <h1 className="p-4 mt-6 text-zinc-400 text-xl flex items-center justify-center">No comments yet !!!</h1>
      }
      
    </div>
  );
};

export default PostPage;
