import React from 'react'

export default function PageWrapper({ children }: { children: React.ReactNode }) {
    return (
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
            {children}
        </div>
    )
}
