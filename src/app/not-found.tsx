"use client"
import Link from 'next/link'
import { Construction, Home } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center px-4">
      <div className="max-w-lg w-full text-center">
        {/* Construction Icon */}
        <div className="flex justify-center mb-8">
          <div className="relative">
            <div className="w-24 h-24 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full flex items-center justify-center shadow-lg">
              <Construction className="w-12 h-12 text-white" />
            </div>
            {/* Animated dots */}
            <div className="absolute -top-2 -right-2 w-4 h-4 bg-yellow-400 rounded-full animate-bounce"></div>
            <div className="absolute -bottom-2 -left-2 w-3 h-3 bg-blue-400 rounded-full animate-bounce delay-75"></div>
          </div>
        </div>

        {/* Main Content */}
        <div className="space-y-6">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Under Construction
            </h1>
            <p className="text-lg text-gray-600 leading-relaxed">
              We&apos;re working hard to bring you something amazing! Our website is currently under construction, 
              but we&apos;ll be back soon with exciting new features.
            </p>
          </div>

          {/* Status Message */}
          <div className="bg-white/60 backdrop-blur-sm border border-gray-200 rounded-lg p-6 shadow-sm">
            <div className="flex items-center justify-center space-x-3 mb-3">
              <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-sm font-medium text-gray-700">Development in Progress</span>
            </div>
            <p className="text-sm text-gray-500">
              Expected launch: Coming Soon
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/"
              className="inline-flex items-center justify-center px-6 py-3 bg-gray-900 text-white rounded-lg font-medium hover:bg-gray-800 transition-colors shadow-lg"
            >
              <Home className="w-4 h-4 mr-2" />
              Back to Home
            </Link>
          </div>

          {/* Additional Info */}
          <div className="text-xs text-gray-400 space-y-1">
            <p>Meanwhile, you can follow our progress:</p>
            <div className="flex justify-center space-x-4 mt-2">
              <a href="#" className="text-blue-500 hover:text-blue-600 transition-colors">
                Twitter
              </a>
              <a href="#" className="text-purple-500 hover:text-purple-600 transition-colors">
                GitHub
              </a>
              <a href="#" className="text-pink-500 hover:text-pink-600 transition-colors">
                Newsletter
              </a>
            </div>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-10 left-10 w-20 h-20 bg-blue-200 rounded-full opacity-20 animate-float"></div>
        <div className="absolute bottom-10 right-10 w-16 h-16 bg-purple-200 rounded-full opacity-20 animate-float delay-75"></div>
        <div className="absolute top-1/3 right-20 w-12 h-12 bg-orange-200 rounded-full opacity-20 animate-float delay-150"></div>
      </div>
    </div>
  )
}