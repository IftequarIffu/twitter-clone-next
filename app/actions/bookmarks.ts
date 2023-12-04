'use server';
import prisma from "@/prisma/client"
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/authOptions";
import { revalidatePath } from "next/cache";
import { Like } from "@prisma/client";


const bookmarkAPost = async(postId: string) => {
    try {
        const session = await getServerSession(authOptions)
        const loggedInUserId = session?.user.id
        const bookmark = await prisma.bookmark.create({
            data: {
                postId: postId,
                userId: loggedInUserId
            }
        })
        revalidatePath("/")
    } catch (error: unknown) {
        return {
            error: error
        }
    }
}

const unbookmarkAPost = async(postId: string) => {
    try {
        const session = await getServerSession(authOptions)
        const loggedInUserId = session?.user.id
        const bookmark = await prisma.bookmark.deleteMany({
            where: {
                AND: [
                    {
                        postId: postId
                    },
                    {
                        userId: loggedInUserId
                    }
                ]
            }
        })
        revalidatePath("/")
    } catch (error: unknown) {
        return {
            error: error
        }
    }
}

const getBookmarksOfAPost = async(postId: string) => {
    try {
        const bookmark = await prisma.bookmark.findMany()
        return bookmark
    } catch (error: unknown) {
        console.log(error)
    }
}

const isPostBookmarkedByMe = async(postId: string) => {
    try {
        const session = await getServerSession(authOptions)
        const loggedInUserId = session?.user.id
        const posts = await prisma.bookmark.findMany({
            where: {
                AND: [
                    {
                        postId: postId
                    },
                    {
                        userId: loggedInUserId
                    }
                ]
            }
        })
    
        if(posts!==null && posts.length!==0){
            return true;
        }
        else{
            return false;
        }
        
    } catch (error) {
        throw new Error("Some error happened")
    }
}


export {getBookmarksOfAPost, bookmarkAPost, unbookmarkAPost, isPostBookmarkedByMe}