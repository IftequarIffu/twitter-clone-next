'use server';
import prisma from "@/prisma/client"
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/authOptions";
import { revalidatePath } from "next/cache";

const getAllCommentsOfAPost = async(postId: string) => {
    try {
        
        const comments = await prisma.comment.findMany({
            where: {
                postId: postId
            },
            include: {
                post: true,
                user: true,
              },
            orderBy: {
                createdAt: 'desc'
            }
        })
    
        return comments
    } catch (error) {
        throw new Error("Some error happened")
    }
    
}


const createComment = async(body: string, postId: string) => {

    try {
        const session = await getServerSession(authOptions)
        const loggedInUserId = session?.user.id
        const newComment = await prisma.comment.create({
            data: {
                body: body,
                userId: loggedInUserId,
                postId: postId
            }
        })
        revalidatePath("/")
      } catch (error) {
        throw new Error("error");
      }
}


export { getAllCommentsOfAPost, createComment }
