'use server'
import prisma from "@/prisma/client"
import bcrypt from 'bcryptjs'

const signUp = async (username: string, password: string, email: string, name: string) => {

    try {
        const newUser = await prisma.user.create({
            data: {
                username: username,
                password: bcrypt.hashSync(password),
                email: email,
                name: name
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