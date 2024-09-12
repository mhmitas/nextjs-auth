'use server'
import bcrypt from "bcryptjs";

import { connectDB } from "../database/db"

export async function createUser(formData) {
    try {
        const name = formData.get('name')
        const email = formData.get('email')
        const password = formData.get('password')
        console.log({ name, email, password })
        const hashedPassword = await bcrypt.hash(password, 10)
        await connectDB()
        // hash the password
        // save the user in db
        // send verification email to the user
    } catch (err) {
        return { message: "Failed to create todo" }
    }
}