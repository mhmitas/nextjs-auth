import { NextResponse } from "next/server"
import jwt from "jsonwebtoken"
import { connectDB } from "@/lib/database/db"
import { User } from "@/lib/database/user.model"


export async function POST(request) {
    try {
        // get the search parameters
        const searchParams = request.nextUrl.searchParams

        // extract the email form search parameters
        const urlEmail = searchParams.get("email")
        if (!urlEmail) {
            return NextResponse.json({ message: 'Email not found' }, { status: 400 })
        }

        // extract the verification token form search parameters
        const token = searchParams.get('verificationToken')
        // if token not found, return the request
        if (!token) {
            return NextResponse.json({ message: 'Token not found' }, { status: 400 })
        };

        // find the user's token secret (verificationToken) associated with the email address
        const tokenSecret = await User.findOne({ email: urlEmail }).select("verificationToken")
        console.log({ tokenSecret: tokenSecret })

        // Verify the token using the token secret
        let decodedToken = jwt.verify(token, tokenSecret?.verificationToken, (err, decoded) => {
            if (err) {
                console.error("Token verification error: " + err);
                throw new Error(err.message || "Token verification error");
            }
            return decoded
        })
        // If token is valid, return the decoded token
        await connectDB()

        await User.findOneAndUpdate(
            { email: decodedToken.email },
            {
                isVerified: true,
                // TODO: change it to null
                verificationToken: null
            },
            { new: true }
        ).select("-password")

        return NextResponse.json(decodedToken, { status: 200 })
    } catch (error) {
        return NextResponse.json({ message: error?.message }, { status: 400 })
    }
}