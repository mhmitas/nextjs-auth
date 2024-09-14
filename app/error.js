'use client'

import { useEffect } from 'react'

export default function Error({ error, reset }) {
    useEffect(() => {
        // Log the error to an error reporting service
        console.error("Error from error page", error)
    }, [error])

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white shadow-lg rounded-lg p-6 max-w-md overflow-x-auto text-center">
                <h2 className="text-2xl font-semibold text-red-600 mb-4">
                    {error.message || "Something went wrong!"}
                </h2>
                <p className="text-gray-500 mb-6">
                    An unexpected error occurred. Please try again.
                </p>
                <button
                    onClick={() => reset()}
                    className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors"
                >
                    Try again
                </button>
            </div>
        </div>
    )
}
