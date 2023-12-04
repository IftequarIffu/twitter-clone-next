import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
import { authOptions } from "@/app/auth/authOptions";
import { getServerSession } from "next-auth";


// Get all bookmarks of a tweet
export const GET = async(req: NextRequest, { params: { tweetId } }: { params: { tweetId: string }} ) => {

    try {
        
        const bookmark = await prisma.bookmark.findMany({
            where: {
                postId: tweetId
            }
        })

        return NextResponse.json(bookmark, { status: 200 })

    } catch (error) {
        return NextResponse.json({ status: 400 })
    }
}






// Bookmark a tweet
export const POST = async(req: NextRequest, { params: { tweetId } }: { params: { tweetId: string }} ) => {

    try {

        const session = await getServerSession(authOptions)
        const loggedInUserId = session?.user.id
        
        const bookmark = await prisma.bookmark.create({
            data: {
                userId: loggedInUserId,
                postId: tweetId
            }
        })

        return NextResponse.json(bookmark, { status: 201 })

    } catch (error) {
        return NextResponse.json({ status: 400 })
    }
}


// Unbookmark a tweet
export const DELETE = async(req: NextRequest, { params: { tweetId } }: { params: { tweetId: string }} ) => {

    try {

        const session = await getServerSession(authOptions)
        const loggedInUserId = session?.user.id
        
        const bookmark = await prisma.bookmark.deleteMany({
            where: {
                AND: [
                    {
                        userId: loggedInUserId
                    },
                    {
                        postId: tweetId
                    }
                ]
            }
        })

        return NextResponse.json(bookmark, { status: 201 })

    } catch (error) {
        return NextResponse.json({ status: 400 })
    }
}