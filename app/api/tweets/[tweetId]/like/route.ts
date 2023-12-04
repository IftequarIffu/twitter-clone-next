import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/auth/authOptions";


// Get all likes for a tweet
export const GET = async (
  req: NextRequest,
  { params: { tweetId } }: { params: { tweetId: string } }
) => {
  try {

    const likes = await prisma.like.findMany({
      where: {
        postId: tweetId,
      },
    });

    return NextResponse.json(likes, { status: 200 });
  } catch (error) {
    return NextResponse.json({ status: 400 });
  }
};




// Like a tweet
export const POST = async (
  req: NextRequest,
  { params: { tweetId } }: { params: { tweetId: string } }
) => {
  try {
    const session = await getServerSession(authOptions);
    const loggedInUserId = session?.user.id;

    const like = await prisma.like.create({
      data: {
        userId: loggedInUserId,
        postId: tweetId,
      },
    });

    return NextResponse.json(like, { status: 200 });
  } catch (error) {
    return NextResponse.json({ status: 400 });
  }
};
