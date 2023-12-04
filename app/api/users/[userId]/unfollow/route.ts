import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/auth/authOptions";


export const POST = async(req: NextRequest, { params: { userId } }: { params: { userId: string }} ) => {

    const session = await getServerSession(authOptions)
    const loggedInUserId = session?.user.id

    try {
        const follow = await prisma.follow.deleteMany({
            where: {
                AND: [
                    {
                        followerId: loggedInUserId
                    },
                    {
                        followingId: userId
                    }
                ]
            }
        })
        return NextResponse.json(follow, { status: 201 })
    } catch (error) {
        return NextResponse.json({ status: 400 })
    }
    
}