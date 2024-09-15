import { connectDB } from "@/lib/database/db";
import { User } from "@/lib/database/user.model";
import { sendVerificationEmail } from "@/lib/utils/sendEmail";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import crypto from "crypto";

export async function POST(req) {
    try {
        const { email, password, firstName } = await req.json();

        await connectDB()

        const isExists = await User.exists({ email });
        if (isExists) {
            throw new Error("An account with this email already exists");
        }

        const tokenSecret = crypto.randomBytes(32).toString('hex')

        const verificationToken = jwt.sign(
            { email },
            tokenSecret,
            { expiresIn: "365d" }
        )

        const hashedPassword = await bcrypt.hash(password, 10)

        const result = await User.create({
            email,
            password: hashedPassword,
            firstName,
            verificationToken: tokenSecret,
            provider: "credentials"
        })

        const user = await User.findById(result?._id).select("-password -verificationToken")

        if (!user) {
            return NextResponse.json({ message: "Something went wrong" }, { status: 500 });
        }
        console.log("User registered successfully: ", user);

        await sendVerificationEmail(email, verificationToken);

        return NextResponse.json({ success: true, message: "User registered successfully registered" }, { status: 200 });

    } catch (error) {
        console.error("Register error: ", error);
        return NextResponse.json({ message: error.message || "Something went wrong went register the user" }, { status: 400 });
    }
}