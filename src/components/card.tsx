import React from 'react'
import { ExternalLink } from 'lucide-react'
import * as motion from 'motion/react-client'
import Link from 'next/link'
import Image from 'next/image';

interface CardProps {
    title: string;
    description: string;
    image: string;
    link: string;
    price: string;
    technologies?: string[];
    className?: string;
}

export default function Card({ 
    title, 
    description, 
    image, 
    link, 
    price, 
    technologies = [],
    className = ''
}: CardProps) {
    return (
        <motion.article 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        className={`basis-[380px] max-w-[380px] box-content px-[15px] py-[18px] ${className}`}>
            <div className="relative group">
                {/* Hover Button */}
                <div className="hidden absolute top-5 right-5 group-hover:block z-10">
                    <Link 
                        href={link}
                        className="flex justify-center items-center w-9 h-9 bg-[theme(colors.zinc.950/.4)] rounded-sm hover:bg-[theme(colors.zinc.950/.6)] transition-colors"
                        title="Ver Template"
                        target="_blank"
                        rel="noopener"
                    >
                        <span className="sr-only">Ver Template</span>
                        <ExternalLink className="w-4 h-4 text-white" />
                    </Link>
                </div>

                {/* Template Image */}
                <div className="aspect-[4/5] mb-4">
                    <div className="h-full bg-white dark:bg-zinc-800 rounded-xl overflow-hidden shadow-sm hover:shadow-[0_20px_25px_-5px_rgba(0,0,0,0.3)] hover:shadow-black/10 transition duration-300">
                        <Link href={link} aria-hidden="true" tabIndex={-1}>
                            <Image 
                                src={image} 
                                alt={title} 
                                className="w-full h-full object-cover object-top"
                                width="380" 
                                height="475"
                                loading="lazy"
                            />
                        </Link>
                    </div>
                </div>

                {/* Template Info - New Layout */}
                <div className="space-y-3">
                    {/* Title and Price */}
                    <div className="flex items-start justify-between gap-3">
                        <div className="flex-1 min-w-0">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 truncate">
                                <Link 
                                    href={link} 
                                    className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                                    rel="bookmark"
                                >
                                    {title}
                                </Link>
                            </h3>
                            <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2 mt-1">
                                {description}
                            </p>
                        </div>
                        
                        <div className="flex flex-col items-end space-y-2">
                            <div className="font-bold text-gray-900 dark:text-gray-100">
                                {price}
                            </div>
                        </div>
                    </div>

                    {/* Technologies Tags */}
                    {technologies.length > 0 && (
                        <div className="flex flex-wrap gap-1.5">
                            {technologies.slice(0, 3).map((tech, index) => (
                                <Link 
                                    key={index} 
                                    href={`/templates/${tech.toLowerCase().replace('.', '-')}`} 
                                    className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700 transition-colors"
                                    rel="tag"
                                >
                                    {tech}
                                </Link>
                            ))}
                            {technologies.length > 3 && (
                                <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-gray-100 text-gray-500 dark:bg-gray-800 dark:text-gray-400">
                                    +{technologies.length - 3}
                                </span>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </motion.article>
    )
}