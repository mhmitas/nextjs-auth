import { connectDB } from "@/lib/database/db";
import { User } from "@/lib/database/user.model";
import { sendVerificationEmail } from "@/lib/utils/sendEmail";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

export async function POST(req) {
    try {
        const { email, password, name } = await req.json();

        await connectDB()

        const isExists = await User.exists({ email });
        if (isExists) {
            throw new Error("An account with this email already exists");
        }

        const verificationToken = jwt.sign(
            { email },
            process.env.EMAIL_VERIFICATION_SECRET,
            { expiresIn: "1d" }
        )

        const user = await User.create({ email, password, name, verificationToken })

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