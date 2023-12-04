'use server';
import prisma from "@/prisma/client"
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/authOptions";
import { revalidatePath } from "next/cache";

const follow = async(idToFollow: string) => {
    try {
        const session = await getServerSession(authOptions)
        const loggedInUserId = session?.user.id

        const follow = await prisma.follow.create({
            data: {
                followerId: loggedInUserId,
                followingId: idToFollow
            },
            include: {
                follower: true,
                following: true
            }
    })
    revalidatePath("/")
    } catch (error) {
        console.log(error)
    }
    
}

const unfollow = async(idToUnfollow: string) => {
    try {
        const session = await getServerSession(authOptions)
        const loggedInUserId = session?.user.id

        const follow = await prisma.follow.deleteMany({
            where: {
                AND: [
                    {
                        followerId: loggedInUserId
                    },
                    {
                        followingId: idToUnfollow
                    }
                ]
            }
    })
    revalidatePath("/")
    } catch (error) {
        console.log(error)
    }
    
}

const isUserFollowedByMe = async(userId: string) => {
    try {
        const session = await getServerSession(authOptions)
        const loggedInUserId = session?.user.id

        const follow = await prisma.follow.findMany({
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
    // console.log(follow)
    if(follow.length !== 0){
        return true
    }
    else{
        return false
    }
    } catch (error) {
        console.log(error)
    }
}

export { follow, unfollow, isUserFollowedByMe }
