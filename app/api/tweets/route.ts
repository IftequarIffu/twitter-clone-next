import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { Post } from "@prisma/client";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/auth/authOptions";


import { z } from "zod";

export const tweetSchema = z.object({
  post: z.string().min(1, "Description is required").max(65535),
});

// Get all tweets
export const GET = async(req: NextRequest) => {

    const tweets = await prisma.post.findMany({
        include: {
            comments: true,
            likes: true,
            bookmarks: true,
          }
    })
    return NextResponse.json(tweets)
}

// Create a tweet
export const POST = async(req: NextRequest) => {

    const session = await getServerSession(authOptions)

    const body = await req.json()
    const validation = tweetSchema.safeParse(body);
    if (!validation.success) {
        return NextResponse.json(validation.error.errors, { status: 400 });
    }
    const newTweet = await prisma.post.create({
        data: {
            body: body.post,
            user: {
                connect: {
                    id: session?.user.id
                }
            },

        }
    })

    return NextResponse.json(newTweet, { status: 201})
}