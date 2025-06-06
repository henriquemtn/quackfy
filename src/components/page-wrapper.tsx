import React from 'react'
import { cn } from '@/lib/utils'

interface PageWrapperProps {
    children: React.ReactNode;
    className?: string;
}

export default function PageWrapper({ children, className }: PageWrapperProps) {
    return (
        <div className={cn("max-w-6xl mx-auto px-4 sm:px-6", className)}>
            {children}
        </div>
    )
}
