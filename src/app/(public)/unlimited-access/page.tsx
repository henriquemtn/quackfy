import TrustedByUsers from '@/components/trusted-by-users'
import React from 'react'

export default function Page() {
    return (
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="flex flex-col justify-center items-center space-y-8 py-16 text-center">
                <TrustedByUsers />
                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                    Get everything, and more!
                </h1>
                <p className="text-lg text-gray-600 mb-8">
                    Buy now and get instant access to our entire gallery of 20 Tailwind CSS templates, new upcoming releases and lifetime support & updates.
                </p>
                
                {/* Pricing Card */}
                <div className="relative flex flex-col items-center justify-center bg-gradient-to-br from-violet-500/5 via-white/20 to-transparent border rounded-lg p-4 max-w-sm w-full">
                    {/* Background Grid Pattern */}
                    <div className="absolute inset-0 -z-10 pointer-events-none" aria-hidden="true">
                        <div className="absolute inset-0 opacity-30 bg-[linear-gradient(rgba(0,0,0,.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,.02)_1px,transparent_1px)] bg-[size:20px_20px]"></div>
                    </div>
                    
                    {/* Badge de Desconto */}
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                        <span className="bg-emerald-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                            44% OFF
                        </span>
                    </div>

                    <div className="text-gray-900 font-semibold tracking-[-.04em] mb-2 mt-3">
                        Unlimited Access
                    </div>
                    
                    <div className="flex justify-start items-center font-bold tracking-[-.04em] mb-1">
                        <span className="text-gray-900 flex">
                            <span>
                                <span className="text-2xl">$</span>
                                <span className="text-5xl">49</span>
                                <span className="text-2xl">,90</span>
                            </span>
                        </span>
                        <span className="ml-3 text-gray-400 font-bold text-xl line-through">
                            $ 89,90
                        </span>
                    </div>
                    
                    <div className="text-sm text-gray-500 mb-6">
                        Get lifetime value for a simple one-time payment.
                    </div>
                    
                    <div className="mb-6">
                        <button className="w-full bg-gray-800 hover:bg-gray-900 text-white font-medium py-3 px-6 rounded-lg transition-colors group shadow-[0px_12px_12px_-6px_rgba(3,7,18,.20)]">
                            <span>Get Unlimited Access</span>
                            <span className="text-white/60 group-hover:translate-x-0.5 transition-transform ml-1.5">
                                <svg className="fill-current inline" xmlns="http://www.w3.org/2000/svg" width="11" height="11">
                                    <path d="M5.977 10.368 4.953 9.354 8.02 6.286H.568V4.805H8.02L4.953 1.742 5.977.723 10.8 5.546z"></path>
                                </svg>
                            </span>
                        </button>
                    </div>
                    
                    <hr className="h-px w-full border-none bg-gradient-to-r from-gray-200/0 via-gray-200/100 to-gray-200/0 m-0" />
                    
                    <div className="mt-6">
                        <div className="text-sm text-gray-900 mb-3 font-medium">
                            You will get:
                        </div>
                        <ul className="text-gray-600 text-sm space-y-2">
                            <li className="flex items-center">
                                <svg className="w-4 h-4 fill-current text-emerald-500 mr-3 flex-shrink-0" viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M10.28 2.28L3.989 8.575 1.695 6.28A1 1 0 00.28 7.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28 2.28z"></path>
                                </svg>
                                <span>Lifetime access to all 20+ templates</span>
                            </li>
                            <li className="flex items-center">
                                <svg className="w-4 h-4 fill-current text-emerald-500 mr-3 flex-shrink-0" viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M10.28 2.28L3.989 8.575 1.695 6.28A1 1 0 00.28 7.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28 2.28z"></path>
                                </svg>
                                <span>Access to new templates as they're released</span>
                            </li>
                            <li className="flex items-center">
                                <svg className="w-4 h-4 fill-current text-emerald-500 mr-3 flex-shrink-0" viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M10.28 2.28L3.989 8.575 1.695 6.28A1 1 0 00.28 7.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28 2.28z"></path>
                                </svg>
                                <span>Use in unlimited commercial projects</span>
                            </li>
                            <li className="flex items-center">
                                <svg className="w-4 h-4 fill-current text-emerald-500 mr-3 flex-shrink-0" viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M10.28 2.28L3.989 8.575 1.695 6.28A1 1 0 00.28 7.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28 2.28z"></path>
                                </svg>
                                <span>Lifetime support & updates</span>
                            </li>
                            <li className="flex items-center">
                                <svg className="w-4 h-4 fill-current text-emerald-500 mr-3 flex-shrink-0" viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M10.28 2.28L3.989 8.575 1.695 6.28A1 1 0 00.28 7.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28 2.28z"></path>
                                </svg>
                                <span>Source files included (HTML, React, Vue)</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}