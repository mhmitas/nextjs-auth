'use client'
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle
} from "@/components/ui/card"
import {
    AlertDialog,
    AlertDialogContent,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog"

import { Label } from "@/components/ui/label"
import { useState } from "react"
import axios from "axios"
import toast from "react-hot-toast"

export default function SignUp() {
    const [processing, setProcessing] = useState(false)
    const [showDialog, setShowDialog] = useState(false)

    async function handleRegister(e) {
        setProcessing(true)
        try {
            e.preventDefault()
            const form = e.target
            const email = form.email.value
            const password = form.password.value
            const firstName = form.firstName.value;

            const res = await axios.post('/api/auth/register', { email, password, firstName })
            console.log(res?.data);
            if (res?.data?.success) {
                e.target.reset()
                setShowDialog(true)
            }
            setProcessing(false)
        } catch (error) {
            setProcessing(false)
            console.error("Register form submission error:", error);
            toast.error(error?.response?.data?.message)
        }
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-muted dark:bg-background my-container py-4">
            <Card className="w-full max-w-md">
                <CardHeader>
                    <CardTitle className="text-2xl">Sign Up</CardTitle>
                    <p className="text-foreground text-base">Create a new account to get started.</p>
                </CardHeader>
                <form onSubmit={handleRegister}>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="name">Name</Label>
                            <Input id="name" name="firstName" placeholder="Enter your name" required />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                name="email" type="email"
                                placeholder="Enter your email"
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="password">Password</Label>
                            <Input id="password" name="password" type="text" placeholder="Enter your password" required />
                        </div>
                    </CardContent>
                    <CardFooter className="flex flex-col items-start space-y-2">
                        <Button type="submit" className="w-full">
                            {processing ? 'Processing...' : "Sign Up"}
                        </Button>
                        <div className="text-sm">
                            Already have an account?{" "}
                            <Link href="/sign-in" className="text-blue-500 hover:underline">
                                Sign in
                            </Link>
                        </div>
                    </CardFooter>
                </form>
            </Card>
            <div>
                <AlertDialog open={showDialog}>
                    <AlertDialogContent className="max-w-md w-[95%] rounded-lg">
                        <AlertDialogHeader>
                            <AlertDialogTitle className="text-center text-2xl sm:text-3xl">Check Your Email</AlertDialogTitle>
                            <p className="text-center text-foreground">We have sent you a confirmation link to your email</p>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <div className="flex justify-center w-full">
                                <Button onClick={() => setShowDialog(false)} type="button" variant="default">Ok</Button>
                            </div>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            </div>
        </div >
    )
}
