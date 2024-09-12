import { sendVerificationEmail } from "@/lib/utils/sendEmail";
import { NextResponse } from "next/server";

export async function POST(request) {
    try {
        const { email, token } = await request.json();
        await sendVerificationEmail(email, token);
        return NextResponse.json({ status: 200, message: "Verification email sent" });
    } catch (error) {
        console.error("Error sending verification email:", error);
        return NextResponse.json({ status: 400, message: `Verification email error ${error?.message}` });
    }
}