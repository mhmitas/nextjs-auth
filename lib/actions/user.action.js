'use server'

import { signIn } from "@/auth";
import { connectDB } from "../database/db";
import { User } from "../database/user.model";
import bcrypt from "bcryptjs"
import { redirect } from "next/navigation";

export async function signInUser(formData) {
    try {
        const email = formData.get('email');
        const password = formData.get('password');

        if (!email || !password) {
            return { error: "Invalid credentials" }
        }

        await connectDB()

        const user = await User.findOne({ email }).select("email password isVerified")

        if (!user) {
            return { error: "User not found, 😞" }
        }
        if (!user.isVerified || user.isVerified !== true) {
            return { error: "Your email address is not verified. Please check your inbox and follow the verification link we sent you." }
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return ({ error: "Invalid password" })
        }

        console.log("50% pass");

        const res = await signIn("credentials", {
            email,
            password,
            redirectTo: '/'
        })

        // redirect("/")
        return res
    } catch (error) {
        console.error('Sign in user 🎬action ❌error:', error)
        throw error
    }
}

export async function Oauth2SignIn(provider) {
    if (provider === "google" || provider === "github") {
        await signIn(provider, { redirectTo: "/" })
    }
}