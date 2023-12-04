import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";

// Get tweets of a user
export const GET = async(req: NextRequest,  { params: { profileId }}: { params: { profileId: string}}) => {

    const posts = await prisma.post.findMany({
        where: {
            userId: profileId
        }
    })

    return NextResponse.json(posts, {status: 200})

}