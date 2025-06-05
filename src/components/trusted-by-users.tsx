import Image from 'next/image'
import React from 'react'

export default function TrustedByUsers() {
    return (
        <div className="flex items-center gap-2 text-sm text-gray-500 p-1 pr-3 rounded-full bg-white bg-opacity-80 shadow backdrop-blur">
            <div className="flex -space-x-2 -ml-0.5">
                <Image
                    src="/devs/henriquemtn.jpeg"
                    alt="henriquemtn"
                    width={20}
                    height={20}
                    className="w-5 h-5 rounded-full border-2 border-white box-content"
                />
                <Image
                    src="/devs/cassianobc.jpeg"
                    alt="cassianobc"
                    width={20}
                    height={20}
                    className="w-5 h-5 rounded-full border-2 border-white box-content"
                />
                <Image
                    src="/devs/lzabsurd.jpeg"
                    alt="lzabsurd"
                    width={20}
                    height={20}
                    className="w-5 h-5 rounded-full border-2 border-white box-content"
                />
                <Image
                    src="/devs/vitorbarcelloss.png"
                    alt="vitorbarcelloss"
                    width={20}
                    height={20}
                    className="w-5 h-5 rounded-full border-2 border-white box-content"
                />
            </div>
            <span>Trusted by <strong className="font-normal text-gray-900 whitespace-nowrap">100+</strong> users.</span>
        </div>
    )
}
