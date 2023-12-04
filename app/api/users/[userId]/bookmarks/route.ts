import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";


// Get all Bookmarks
export const GET = async(req: NextRequest, { params: { userId } }: { params: { userId: string } }) => {

    try {
        const bookmarks = await prisma.bookmark.findMany({
            where: {
                userId: userId
            }
        })

        return NextResponse.json(bookmarks, { status: 200 })
    } catch (error) {
        return NextResponse.json({ status: 400 })
    }
}

