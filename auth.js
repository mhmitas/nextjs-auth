import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { User } from "./lib/database/user.model";
import { connectDB } from "./lib/database/db";
import bcrypt from "bcryptjs"
import Google from "next-auth/providers/google"

export const { handlers, signIn, signOut, auth } = NextAuth({
    session: {
        strategy: "jwt"
    },
    providers: [
        Google,
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
                    if (user.provider !== 'credentials') {
                        throw new Error("User is not using credentials provider")
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
        async signIn({ user, account, profile }) {
            await connectDB()
            try {
                // handle google sign in process
                if (account.provider === "google") {
                    const existedUser = await User.findOne({ email: user.email });
                    console.log({ existedUser })
                    // check if the user is already exists, and is verified
                    if (existedUser && existedUser.isVerified) {
                        // if user exists and not from google provider, don't allow sign in;
                        if (existedUser.provider !== "google") {
                            throw new Error("Email is already registered with a different provider")
                        }

                        const existedUserObj = await existedUser.toObject();

                        // update the user object with the database credentials
                        user._id = existedUserObj?._id;
                        user.picture = existedUserObj?.avatar;
                        user.firstName = existedUserObj?.firstName;
                        user.lastName = existedUserObj?.lastName;
                        user.provider = existedUserObj?.provider;
                        user.role = existedUserObj?.role;
                        user.isVerified = existedUserObj?.isVerified;

                        return existedUserObj;
                    } else {
                        // If the user is not found in the database, create a new one
                        const newUser = await User.create({
                            email: user?.email,
                            firstName: user?.name,
                            avatar: profile?.picture,
                            provider: account?.provider,
                            isVerified: true,
                            role: "user"
                        })
                        console.log("New user, created by google:", newUser);
                        // if the user created successfully, then update the user with with the new user
                        if (!newUser) {
                            throw new Error("Google sign in failed");
                        }

                        const newUserObj = await newUser.toObject();

                        user._id = newUserObj._id;
                        user.avatar = newUserObj.avatar;
                        user.firstName = newUserObj.firstName;
                        user.lastName = newUserObj.lastName;
                        user.provider = newUserObj.provider;
                        user.role = newUserObj.role;
                        user.isVerified = newUserObj.isVerified;
                        return newUser
                    }
                }
                // if credentials sign in return true
                if (account.provider === 'credentials') {
                    return true;
                }
            } catch (error) {
                throw new Error(error?.message || "Failed to sign in");
            }
        },
        jwt({ token, user }) {
            if (user) {
                token.id = user?._id;
                token.firstName = user?.firstName
                token.lasName = user?.lasName
                token.picture = user?.avatar || user?.picture;
                token.provider = user?.provider;
                token.role = user?.role;
                token.isVerified = user?.isVerified;
            }
            return token
        },
        session({ session, token }) {
            if (session) {
                session.user.id = token?.id;
                session.user.firstName = token?.firstName;
                session.user.lastName = token?.lastName;
                session.user.picture = token?.picture;
                session.user.provider = token?.provider;
                session.user.role = token?.role;
                session.user.isVerified = token?.isVerified;
            }
            // console.log("token from session callback", token);
            return session
        },
    },
    pages: {
        signIn: "/sign-in",
        error: "/error",
    }
})