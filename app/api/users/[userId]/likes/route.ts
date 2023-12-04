import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";


// Get all the posts which user liked
export const GET = async(req: NextRequest, { params: {userId} }: { params: {userId: string}}) => {

    try {
        const likes = await prisma.like.findMany({
            where: {
                userId: userId
            }
        })
        return NextResponse.json(likes, { status: 200 })
    } catch (error) {
        
        return NextResponse.json({ status: 401 })
    }
}
