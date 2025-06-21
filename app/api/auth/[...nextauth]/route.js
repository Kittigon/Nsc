import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "@/utils/db";
import bcrypt from 'bcrypt'

//Login
const authOptions = {
    providers: [
        CredentialsProvider({
            name: "credentials",
            async authorize(credentials, req) {
                const { email, password } = credentials;
                try {

                    const user = await prisma.users.findUnique({
                        where: {
                            email: email
                        }
                    })

                    if (!user) {
                        return null
                    }

                    const isMatch = await bcrypt.compare(password, user.password)

                    if (!isMatch) {
                        return null
                    }

                    return user;

                } catch (error) {
                    console.log("Error : ", + error)
                }
            }
        })
    ],
    session: {
        strategy: "jwt",
    },
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
                token.role = user.role;
            }
            return token;
        },
        async session({ session, token }) {
            if (token && session.user) {
                session.user.id = token.id; 
                session.user.role = token.role;
            }
            return session;
        },
    },
    secret: process.env.NEXTAUTH_SECRET,
    pages: {
        signIn: '/login'
    }
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }