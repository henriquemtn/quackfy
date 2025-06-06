'use client'

import React from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'

const menuItems = [
  { href: '/docs', label: 'Getting Started' },
  { href: '/docs/nextjs', label: 'Next.js Templates' },
]

export default function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="w-full md:w-64 md:h-screen bg-white border-b md:border-r border-gray-200">
      <div className="p-6">
        <h2 className="text-lg font-semibold text-gray-800">Documentation</h2>
        <nav className="mt-4">
          <ul className="space-y-2">
            {menuItems.map((item) => {
              const isActive = pathname === item.href
              
              return (
                <li key={item.href}>
                  <Link 
                    href={item.href} 
                    className={`block px-3 py-2 rounded-md transition-colors ${
                      isActive 
                        ? 'text-orange-600 bg-orange-50 font-medium border border-orange-200' 
                        : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50'
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              )
            })}
          </ul>
        </nav>
      </div>
    </aside>
  )
}