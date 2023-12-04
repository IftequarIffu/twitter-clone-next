import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
import { authOptions } from "@/app/auth/authOptions";

// Unlike a tweet
export const DELETE = async (
  req: NextRequest,
  { params: { tweetId } }: { params: { tweetId: string } }
) => {
  try {
    const session = await getServerSession(authOptions);
    const loggedInUserId = session?.user.id;

    const unlike = await prisma.like.deleteMany({
      where: {
        AND: [
          {
            userId: loggedInUserId,
          },
          {
            postId: tweetId,
          },
        ],
      },
    });

    return NextResponse.json(unlike, { status: 200 });
  } catch (error) {
    return NextResponse.json({ status: 401 });
  }
};
