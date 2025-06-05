import React from 'react'
import Link from 'next/link'
import TrustedByUsers from './trusted-by-users'
import * as motion from 'motion/react-client'

export default function Hero() {
    return (
        <section className="relative before:absolute before:inset-0 before:pointer-events-none before:-z-10 before:bg-gray-100 after:absolute after:inset-x-0 after:bottom-0 after:h-px after:bg-gradient-to-r after:from-transparent after:via-gray-900/10 after:to-transparent z-10">
            {/* Background Gradient */}
            <div className="absolute inset-0 bg-[linear-gradient(145deg,var(--tw-gradient-stops))] from-violet-500/25 to-gray-200/0 to-50% pointer-events-none -z-10" aria-hidden="true">
                {/* Top Left Shape */}
                <svg className="absolute -top-[200px] left-1/2 -translate-x-1/2 -ml-[520px]" xmlns="http://www.w3.org/2000/svg" width="674" height="596" fill="none">
                    <g filter="url(#sh1a)">
                        <path fill="url(#sh1b)" fillRule="evenodd" d="m93 93 488 329.105L303.687 503 93 93Z" clipRule="evenodd"></path>
                    </g>
                    <defs>
                        <linearGradient id="sh1b" x1="-2.47" x2="149.396" y1="227.957" y2="586.484" gradientUnits="userSpaceOnUse">
                            <stop stopColor="#FB7185" stopOpacity=".32"></stop>
                            <stop offset="1" stopColor="#FB7185" stopOpacity=".01"></stop>
                        </linearGradient>
                        <filter id="sh1a" width="672.843" height="594.843" x=".578" y=".578" colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse">
                            <feFlood floodOpacity="0" result="BackgroundImageFix"></feFlood>
                            <feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"></feBlend>
                            <feGaussianBlur result="effect1_foregroundBlur_2006_5" stdDeviation="46.211"></feGaussianBlur>
                        </filter>
                    </defs>
                </svg>
            </div>

            <div className="max-w-6xl mx-auto px-4 sm:px-6">
                <div className="relative pt-28 md:pt-36 pb-12 md:pb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, ease: 'easeInOut', delay: 0.2 }}
                        className="max-w-[924px] text-center mx-auto flex items-center flex-col">
                        <h1 className="text-4xl md:text-5xl text-center font-bold text-gray-900 mb-5">
                              Launch your next project with confidence
                        </h1>

                        <p className="text-lg text-gray-500 px-4">
                            Build stunning landing pages, websites, and dashboards — powered by Tailwind CSS and crafted in HTML, React, and Next.js. Skip the boilerplate and save weeks of work with a solid foundation built for speed and scalability.
                        </p>

                        {/* Social Proof */}
                        <div className="-order-1">
                            <div className="inline-flex flex-wrap gap-3 mb-6">
                                {/* Trusted by users */}
                                <TrustedByUsers />

                                {/* Quality Badge */}
                                <div className="flex items-center gap-1.5 text-sm text-gray-500 p-1 pl-2 pr-3 rounded-full bg-white bg-opacity-80 shadow backdrop-blur max-sm:hidden">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="15" fill="none">
                                        <path fill="#4EB9FA" d="M12 0C8.8 0 6.8 1.596 6 4.787c1.2-1.596 2.6-2.194 4.2-1.795.913.228 1.565.888 2.288 1.62C13.664 5.801 15.026 7.18 18 7.18c3.2 0 5.2-1.596 6-4.787-1.2 1.595-2.6 2.194-4.2 1.795-.913-.228-1.565-.888-2.288-1.62C16.336 1.38 14.974 0 12 0ZM6 7.18c-3.2 0-5.2 1.597-6 4.788 1.2-1.596 2.6-2.194 4.2-1.795.913.227 1.565.888 2.288 1.62 1.176 1.19 2.538 2.569 5.512 2.569 3.2 0 5.2-1.596 6-4.788-1.2 1.596-2.6 2.195-4.2 1.796-.913-.228-1.565-.888-2.288-1.62C10.336 8.56 8.974 7.18 6 7.18Z"></path>
                                    </svg>
                                    <span className="font-normal text-gray-900 whitespace-nowrap">Tailwind CSS</span>
                                </div>
                            </div>
                        </div>

                        {/* CTA Button */}
                        <div className="mt-8">
                            <Link
                                className="inline-flex items-center px-6 py-3 text-gray-50 bg-gray-800 hover:bg-gray-900 group shadow-[0px_12px_12px_-6px_rgba(3,7,18,.20)] rounded-lg font-medium transition-colors"
                                href="/subscribe"
                            >
                                <span>Get Unlimited Access</span>
                                <span className="text-white/60 group-hover:translate-x-0.5 transition-transform ml-1.5">
                                    <svg className="fill-current" xmlns="http://www.w3.org/2000/svg" width="11" height="11">
                                        <path d="M5.977 10.368 4.953 9.354 8.02 6.286H.568V4.805H8.02L4.953 1.742 5.977.723 10.8 5.546z"></path>
                                    </svg>
                                </span>
                            </Link>
                        </div>

                    </motion.div>

                    {/* Bottom Right Purple Circle */}
                    <div className="absolute bottom-0 left-[520px] pointer-events-none -z-10" aria-hidden="true">
                        <svg xmlns="http://www.w3.org/2000/svg" width="1132" height="641" fill="none">
                            <g filter="url(#sh2a)" opacity=".48">
                                <circle cx="566" cy="540" r="246" fill="#7E5FFB"></circle>
                            </g>
                            <defs>
                                <filter id="sh2a" width="1132" height="1132" x="0" y="-26" colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse">
                                    <feFlood floodOpacity="0" result="BackgroundImageFix"></feFlood>
                                    <feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"></feBlend>
                                    <feGaussianBlur result="effect1_foregroundBlur_2010_54" stdDeviation="160"></feGaussianBlur>
                                </filter>
                            </defs>
                        </svg>
                    </div>
                </div>
            </div>
        </section>
    )
}