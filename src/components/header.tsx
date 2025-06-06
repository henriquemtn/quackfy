import Link from 'next/link'
import React from 'react'
import { Button } from './ui/button'
import Image from 'next/image'
import TopBar from './topbar'

export default function Header() {
    return (
        <>
            <header id="site-header" className="supports-backdrop-blur:bg-background/90 sticky top-0 z-40 w-full border-b border-border bg-background/40 backdrop-blur-lg">
                <TopBar />
                <div className="max-w-6xl mx-auto px-4 py-1">
                    <div className="flex items-center justify-between gap-3 h-14 rounded-2xl px-3 ">
                        {/* Logo */}
                        <Link className="block" href="/" rel="home">
                            <Image
                                src={"/logo.jpg"}
                                alt="Quackfy Logo"
                                width={64}
                                height={64}
                                className="w-8 h-8 object-cover object-top rounded-full border border-gray-800 dark:border-gray-700 box-content"
                            />
                            <span className='sr-only'>Quackfy</span>
                        </Link>

                        <div className="inline-flex items-center">
                            {/* Desktop Navigation */}
                            <nav className="hidden sm:flex sm:grow">
                                <ul className="flex grow justify-end flex-wrap items-center text-sm">
                                    <li className="ml-6">
                                        <Link href="/docs" className="flex text-gray-800 hover:underline py-2 px-2">
                                            Documentation
                                        </Link>
                                    </li>
                                    <li className="ml-5 pl-5 border-l border-gray-200">
                                        <Link className="flex text-gray-800 hover:underline py-2 px-2" href="/login">
                                            Sign In
                                        </Link>
                                    </li>
                                </ul>
                            </nav>

                            {/* CTA Button */}
                            <div className="ml-6">
                                <Button>
                                    Get Started
                                </Button>
                            </div>

                            {/* Mobile Menu Button */}
                            <div className="flex sm:hidden ml-2">
                                <button
                                    id="header-nav-toggle"
                                    className="group inline-flex w-8 h-8 text-gray-800 text-center items-center justify-center transition"
                                    aria-controls="header-nav"
                                    aria-expanded="false"
                                >
                                    <span className="sr-only">Menu</span>
                                    <svg className="fill-current pointer-events-none" width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                                        <rect className="origin-center transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.1)] -translate-y-[5px] translate-x-[7px] group-[[aria-expanded=true]]:rotate-[315deg] group-[[aria-expanded=true]]:translate-y-0 group-[[aria-expanded=true]]:translate-x-0" y="7" width="9" height="2" rx="1"></rect>
                                        <rect className="origin-center group-[[aria-expanded=true]]:rotate-45 transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.8)]" y="7" width="16" height="2" rx="1"></rect>
                                        <rect className="origin-center transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.1)] translate-y-[5px] group-[[aria-expanded=true]]:rotate-[135deg] group-[[aria-expanded=true]]:translate-y-0" y="7" width="9" height="2" rx="1"></rect>
                                    </svg>
                                </button>

                                {/* Mobile Navigation */}
                                <nav id="header-nav" className="grid grid-rows-[0fr] rounded-xl [&.menu-is-open]:grid-rows-[1fr] [&.menu-is-open]:visible absolute inset-x-0 top-full mt-1 z-50 [&.menu-is-open]:bg-white [&.menu-is-open]:shadow-lg shadow-black/[.04] transition-all duration-300 [&>div]:opacity-0 [&.menu-is-open>div]:opacity-100">
                                    <div className="overflow-hidden transition-opacity duration-300">
                                        <ul className="text-sm py-1.5 px-3 divide-y divide-gray-100">
                                            <li>
                                                <Link href="/docs" className="flex text-gray-800 hover:underline py-2 px-2">
                                                    Documentation
                                                </Link>
                                            </li>
                                            <li>
                                                <Link className="flex text-gray-800 hover:underline py-2 px-2" href="/entrar">
                                                    Sign In
                                                </Link>
                                            </li>
                                        </ul>
                                    </div>
                                </nav>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
        </>
    )
}