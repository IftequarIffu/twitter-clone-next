import { authOptions } from '@/app/auth/authOptions';
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import prisma from '@/prisma/client';


// Delete a comment on a tweet
export const DELETE = async (
    req: NextRequest,
    { params: { commentId } }: { params: { commentId: string } }
  ) => {
    try {
      const session = await getServerSession(authOptions);
      const loggedInUserId = session?.user.id;
  
      const newComment = await prisma.comment.delete({
        where: {
          id: commentId
        },
      });
  
      return NextResponse.json(newComment, { status: 201 });
    } catch (error) {
      return NextResponse.json({ status: 400 });
    }
  };
  