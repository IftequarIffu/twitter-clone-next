import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@auth/prisma-adapter";
import prisma from "@/prisma/client";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from 'bcryptjs'

export const authOptions: NextAuthOptions = {
    adapter: PrismaAdapter(prisma),
    providers: [
      GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID!,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        profile(profile) {
          return {
            id: profile.sub,
            name: profile.name,
            email: profile.email,
            image: profile.image,
            username: generateUsernameFromEmail(profile.email)
          };
        },
      }),
      CredentialsProvider({
        name: 'credentials',
        credentials: {
          username: {
            label: "Username",
            type: "text",
            placeholder: "JSmith"
          },
          password: {
            label: "Password",
            type: "password"
          }
        },
        async authorize(credentials, req) {
          // Add logic here to look up the user from the credentials supplied
          if(!credentials){
            return null
          }

          const { email, password } = credentials as unknown as {
            email: string;
            password: string;
          };

          const user = await prisma.user.findUnique({
            where: {
              email: email
            }
          })

          if(!user){
            return null
          }

          if(!bcrypt.compareSync(password, user.password as string)){
            return null
          }

          return user;
          }
      })
    ],
    session: {
      strategy: "jwt",
    },
  
    callbacks: {
      async jwt({ token, account, user }) {
        if (account) {
          token.accessToken = account.access_token;
          token.id = user?.id;
        }
        return token;
      },
      async session({ session, token }) {
        session.user!.id = token.id;
        return session;
      },
    },
  };

  function generateUsernameFromEmail(email: string) {
    // Extract the portion of the email before the "@" symbol
    const emailPrefix = email.split("@")[0];
  
    // Remove any non-alphanumeric characters and convert to lowercase
    const sanitizedPrefix = emailPrefix.replace(/[^a-zA-Z0-9]/g, "").toLowerCase();
  
    // Add a random number or string to the sanitized prefix
    const randomSuffix = Math.random().toString(36).substring(2, 8); // Generate a random string
    const generatedUsername = `${sanitizedPrefix}`;
  
    return generatedUsername;
  }
