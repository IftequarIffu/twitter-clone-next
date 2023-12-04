import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

// Get a tweet by its ID
export const GET = async (
  req: NextRequest,
  { params: { tweetId } }: { params: { tweetId: string } }
) => {
  try {
    const tweet = await prisma.post.findUnique({
      where: {
        id: tweetId,
      },
    });

    return NextResponse.json(tweet, { status: 200 });
  } catch (error) {
    return NextResponse.json({ status: 400 });
  }
};

// Delete a tweet by its ID
export const DELETE = async (
  req: NextRequest,
  { params: { tweetId } }: { params: { tweetId: string } }
) => {
  try {
    const tweet = await prisma.post.delete({
      where: {
        id: tweetId,
      },
    });

    return NextResponse.json(tweet, { status: 200 });
  } catch (error) {
    return NextResponse.json({ status: 400 });
  }
};
