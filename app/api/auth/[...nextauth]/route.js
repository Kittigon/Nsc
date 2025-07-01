import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "@/utils/db";
import bcrypt from 'bcrypt';

export const authOptions = {
    providers: [
        CredentialsProvider({
            name: "credentials",
            async authorize(credentials) {
                try {
                    if (!credentials?.email || !credentials?.password) {
                        return null;
                    }

                    const user = await prisma.users.findUnique({
                        where: { email: credentials.email },
                    });

                    if (!user || !user.password) {
                        return null;
                    }

                    const isMatch = await bcrypt.compare(credentials.password, user.password);

                    if (!isMatch) {
                        return null;
                    }

                    // Return a sanitized user object
                    return {
                        id: user.id,
                        email: user.email,
                        fname: user.fname,
                        lname: user.lname,
                        role: user.role,
                    };
                } catch (error) {
                    console.error("Authorize error:", error);
                    return null;
                }
            },
        }),
    ],
    session: {
        strategy: "jwt",
    },
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
                token.role = user.role;
                token.fname = user.fname;
                token.lname = user.lname;
            }
            return token;
        },
        async session({ session, token }) {
            if (token && session.user) {
                session.user.id = token.id;
                session.user.role = token.role;
                session.user.fname = token.fname;
                session.user.lname = token.lname;
            }
            return session;
        },
    },
    secret: process.env.NEXTAUTH_SECRET,
    pages: {
        signIn: "/login",
    },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };