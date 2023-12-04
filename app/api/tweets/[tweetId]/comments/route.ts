import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/auth/authOptions";

// Get all comments of a tweet
export const GET = async (
  req: NextRequest,
  { params: { tweetId } }: { params: { tweetId: string } }
) => {
  try {
    const comments = await prisma.comment.findMany({
      where: {
        postId: tweetId,
      },
    });

    return NextResponse.json(comments, { status: 200 });
  } catch (error) {
    return NextResponse.json({ status: 400 });
  }
};

// Post a comment on a tweet
export const POST = async (
  req: NextRequest,
  { params: { tweetId } }: { params: { tweetId: string } }
) => {
  try {
    const session = await getServerSession(authOptions);
    const loggedInUserId = session?.user.id;

    const { comment } = await req.json();
    const newComment = await prisma.comment.create({
      data: {
        body: comment,
        postId: tweetId,
        userId: loggedInUserId,
      },
    });

    return NextResponse.json(newComment, { status: 201 });
  } catch (error) {
    return NextResponse.json({ status: 400 });
  }
};

