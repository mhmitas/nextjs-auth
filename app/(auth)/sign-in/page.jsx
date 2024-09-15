'use client'
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { Oauth2SignIn, signInUser } from "@/lib/actions/user.action";
import { Separator } from "@/components/ui/separator"
import { FcGoogle } from "react-icons/fc";

export default function SignIn() {
    const [error, setError] = useState("")

    async function handleSubmit(e) {
        e.preventDefault()
        try {
            const formData = new FormData(e.currentTarget);
            const res = await signInUser(formData);
            console.log("Sign in page response: " + res);
            if (!!res.error) {
                return setError(res.error)
            } else {
                setError("")
            }
        } catch (error) {
            console.error("SignIn error: " + error);
            setError(error.message);
        }
    }

    return (
        <div className="flex items-center justify-center min-h-screen my-container py-4">
            <div className="w-full max-w-md border p-6 rounded-lg">
                <div>
                    <h1 className="text-2xl">Sign In</h1>
                    <p className="text-foreground text-base">
                        Enter your email and password to access your account.
                    </p>
                    {error && <p className="text-red-500 text-sm">{error}</p>}
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email" name="email"
                                type="email"
                                placeholder="name@example.com"
                                required
                            />
                        </div>
                        <div>
                            {/* // todo: change type to "password" */}
                            <div className="space-y-2">
                                <Label htmlFor="password">Password</Label>

                                <Input name="password" id="password" type="text" required />
                            </div>
                            <div>
                                <Link href="#" className="text-sm text-blue-500 hover:underline">
                                    Forgot password?
                                </Link>
                            </div>
                        </div>
                        <div className="mb-2">
                            <Button type="submit" className="w-full">
                                Sign In
                            </Button>
                        </div>
                    </div>
                    <div>
                        <Link href="/sign-up" className="text-sm">
                            Already have an account?
                            <span className="text-blue-500 hover:underline"> Sign Up</span>
                        </Link>
                    </div>
                </form>
                <Separator className="my-4" />
                <form action={() => Oauth2SignIn("google")}>
                    <Button type="submit" className="w-full">
                        <FcGoogle className="text-2xl mr-2" />
                        Sign In with Google
                    </Button>
                </form>
            </div>
        </div>
    )
}
