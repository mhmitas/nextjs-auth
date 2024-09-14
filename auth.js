import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { User } from "./lib/database/user.model";
import { connectDB } from "./lib/database/db";
import bcrypt from "bcryptjs"

export const { handlers, signIn, signOut, auth } = NextAuth({
    session: {
        strategy: "jwt"
    },
    providers: [
        Credentials({
            credentials: {
                email: {},
                password: {},
            },
            authorize: async (credentials) => {
                try {
                    const { email, password } = credentials;

                    await connectDB()

                    const user = await User.findOne({ email })

                    if (!user) {
                        throw new Error("User not found, 😞")
                    }
                    if (!user.isVerified || user.isVerified !== true) {
                        throw new Error("Email is not verified")
                    }

                    const isPasswordValid = await bcrypt.compare(password, user.password);

                    if (!isPasswordValid) {
                        throw new Error("Password is incorrect")
                    }

                    const userObj = JSON.parse(JSON.stringify(user));
                    delete userObj.password;

                    return userObj
                } catch (error) {
                    console.error("Credentials sign in error:" + error)
                    throw new Error(error)
                }
            }
        })
    ],
    callbacks: {
        jwt({ token, user }) {
            if (user) {
                token.id = user?._id;
                token.firstName = user?.firstName
                token.lasName = user?.lasName
                token.picture = user?.avatar;
                token.provider = user?.provider;
                token.role = user?.role;
                token.isVerified = user?.isVerified;
            }
            return token
        },
        session({ session, token }) {
            if (session) {
                session.user.firstName = token?.firstName;
                session.user.lastName = token?.lastName;
                session.user.picture = token?.picture;
                session.user.provider = token?.provider;
                session.user.role = token?.role;
                session.user.isVerified = token?.isVerified;
            }
            return session
        },
    },
    pages: {
        signIn: "/sign-in",
        error: "/auth-error",
    }
})