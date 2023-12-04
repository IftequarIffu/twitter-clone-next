import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";


// Get a user's followers
export const GET = async(req: NextRequest, { params: { userId } }: { params: { userId: string } } ) => {

    try {
        const followers = await prisma.follow.findMany({
            where: {
                followingId: userId
            }
        })

        return NextResponse.json(followers, { status: 200 })
    } catch (error) {
        return NextResponse.json({ status: 400 })
    }
}