import prisma from "@/prisma/client"

const getAllUsers = async() => {

    const users = await prisma.user.findMany({
        include: {
            posts: true,
            comments: true,
            bookmarks: true,
            likes: true,
            follower: true,
            following: true
        }
    })
    return users
}

export { getAllUsers }