import React from 'react'
import { Button } from '@/components/ui/button'

export default function LoginForm() {
    return (
        <div className='flex flex-col items-center justify-center py-16'>
            <h2 className='text-4xl font-extrabold mb-4'>Sign in with your email</h2>
            <p className='text-gray-400'>Enter the email address associated with your account and we will send a unique sign in link to your inbox.</p>
            <form className='space-y-4 w-full flex flex-col justify-center items-center p-6 max-w-lg'>
                <div className='flex flex-col items-start justify-center w-full mb-4'>
                    <label htmlFor='email' className='block text-sm font-medium text-gray-700 mb-1'>Email</label>
                    <input
                        type='email'
                        id='email'
                        className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                        placeholder='Enter your email'
                    />
                </div>
                <Button className='p-6 text-base px-8'>Get the link</Button>
            </form>
        </div>
    )
}
