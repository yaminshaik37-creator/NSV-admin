'use client'

export default function NotFound() {
    return (
        <main className="min-h-screen flex flex-col items-center justify-center">
            <h1 className="text-3xl font-bold mb-4">Not Found</h1>
            <p className="text-gray-600 mb-6">
                You don&apos;t have permission to view this page or it doesn&apos;t exist.
            </p>
            <a
                href="/dashboard"
                className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
            >
                Go to Dashboard
            </a>
        </main>
    )
} 
