import React from 'react'
import { Link } from 'react-router-dom'

export default function Header() {
    return (
        <div className='w-full h-auto mt-10'>
            <div className='flex flex-row items-center justify-between px-8 py-5'>
                <div className='w-1/4'>
                    <Link to='/' className='border-0'><p className='text-white font-bold text-2xl cursor-pointer'>MovieWatch</p></Link>
                </div>
                <div className='w-1/2'>
                    <input placeholder='Search movie...' className='py-2 px-5 rounded-full w-full' />
                </div>
                <div className='w-1/4 flex flex-row gap-3 justify-end'>
                    <button className='bg-buttonColor py-2 px-3 rounded-md text-white hover:bg-[#2a2e3c]'>Login</button>
                    <button className='bg-buttonColor py-2 px-3 rounded-md text-white hover:bg-[#2a2e3c]'>Register</button>
                </div>
            </div>
            <div className='flex justify-end px-8 py-2 bg-zinc-800'>
                <ul className='flex flex-row gap-6'>
                    <li className='cursor-pointer text-gray-600 hover:text-white'>About</li>
                    <li className='cursor-pointer text-gray-600 hover:text-white'>Contact</li>
                    <li className='cursor-pointer text-gray-600 hover:text-white'>Movies</li>
                    <li className='cursor-pointer text-gray-600 hover:text-white'>Series</li>
                </ul>
            </div>
        </div>
    )
}
