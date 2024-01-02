'use server'
import prisma from "@/prisma/client"

const signUp = async (username: string, password: string, email: string) => {

    try {
        const newUser = await prisma.user.create({
            data: {
                username: username,
                password: password,
                email: email
            }
        })
        if(!newUser){
            return null
        }

        return newUser
    } catch (error) {
        return null
    }
}

export default signUp