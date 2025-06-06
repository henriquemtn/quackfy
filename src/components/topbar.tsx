import React from 'react'

export default function TopBar() {
    return (
        <div className="relative flex justify-center px-3 sm:px-5 py-3 text-sm text-center bg-zinc-800 overflow-hidden">
            <div className="px-4 md:px-6">
                <span className="text-white before:absolute before:inset-0">
                    ✨ 80% OFF for the first 10 users! Use code <strong className="text-yellow-400">QUACK100</strong> at checkout ✨
                </span>
            </div>
        </div>
    )
}
