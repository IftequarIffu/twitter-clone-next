'use server';
import prisma from "@/prisma/client"
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/authOptions";
import { revalidatePath } from "next/cache";


const likeAPost = async(postId: string) => {
    try {
        const session = await getServerSession(authOptions)
        const loggedInUserId = session?.user.id
        console.log(loggedInUserId)
        const like = await prisma.like.create({
            data: {
                postId: postId,
                userId: loggedInUserId
            }
        })
        // return like
        revalidatePath("/")
    } catch (error: unknown) {
        console.log(error)
    }
}

const unlikeAPost = async(postId: string) => {
    try {
        const session = await getServerSession(authOptions)
        const loggedInUserId = session?.user.id
        const like = await prisma.like.deleteMany({
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
        // return like
        revalidatePath("/")
    } catch (error: unknown) {
        console.log(error)
    }
}

const getLikesOfAPost = async(postId: string) => {
    try {
        const likes = await prisma.like.findMany()
        return likes
    } catch (error: unknown) {
        console.log(error)
    }
}

const isPostLikedByUser = async(postId: string, userId: string) => {
    try {
        const posts = await prisma.like.findMany({
            where: {
                AND: [
                    {
                        postId: postId
                    },
                    {
                        userId: userId
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

export {getLikesOfAPost, likeAPost, unlikeAPost, isPostLikedByUser}