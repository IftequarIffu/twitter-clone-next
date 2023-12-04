import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";


// Get all the users whois being followed by this user
export const GET = async(req: NextRequest, { params: { userId } }: { params: { userId: string } } ) => {

    try {
        const followees = await prisma.follow.findMany({
            where: {
                followerId: userId
            }
        })

        return NextResponse.json(followees, { status: 200 })
    } catch (error) {
        return NextResponse.json({ status: 400 })
    }
}