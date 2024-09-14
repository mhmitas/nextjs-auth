'use client'

import { useSearchParams } from "next/navigation"

export default function AuthErrorPage() {
    const search = useSearchParams()
    const error = search.get('error')

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-red-100 text-destructive-foreground p-4">
            <h1 className="text-4xl font-bold mb-4">Authentication Error</h1>
            <p className="text-lg">{error}</p>
        </div>
    )
}