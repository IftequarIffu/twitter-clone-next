'use server';
import prisma from "@/prisma/client"
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/authOptions";
import { revalidatePath } from "next/cache";

const getAllPosts = async() => {
    try {
        
        const posts = await prisma.post.findMany({
            include: {
                comments: true,
                likes: true,
                bookmarks: true,
              },
            orderBy: {
                createdAt: 'desc'
            }
        })
    
        return posts
    } catch (error) {
        throw new Error("Some error happened")
    }
    
}

const getPostById = async(postId: string) => {
    try {
        
        const post = await prisma.post.findUnique({
            where: {
                id: postId
            },
            include: {
                comments: true,
                likes: true,
                bookmarks: true,
              }
        })
    
        return post
    } catch (error) {
        throw new Error("Some error happened")
    }
}


const createPost = async(body: string) => {

    try {
        const session = await getServerSession(authOptions)
        const loggedInUserId = session?.user.id
        const newPost = await prisma.post.create({
            data: {
                body: body,
                userId: loggedInUserId
            }
        })
        return newPost
      } catch (error) {
        throw new Error("error");
      }
      finally{
        revalidatePath("/")
      }
}

const getUserPosts = async(userId: string) => {

    try {
        const posts = await prisma.post.findMany({
            where: {
                userId: userId
            },
            include: {
                comments: true,
                likes: true,
                bookmarks: true,
              },
            orderBy: {
                createdAt: 'desc'
            }
        }) 
    } catch (error) {
        throw new Error("error");
    }

}


export { getAllPosts, createPost, getUserPosts, getPostById }
