import React from 'react'
import { Link } from 'react-router-dom'
import Search from '../_components/Search'
import { CgMenuRight } from "react-icons/cg";

export default function Header() {
    return (
        <div className='w-full h-auto mt-10 max-md:mt-0'>
            <div className='flex flex-row items-center justify-between px-8 py-5 max-sm:px-4'>
                <div className='w-1/4 flex flex-row items-center gap-2 max-sm:w-full'>
                    {/* <div className='text-white hidden max-sm:flex'>
                        <CgMenuRight size={25}/>
                    </div> */}
                    <Link to='/' className='border-0'><p className='text-white font-bold text-2xl cursor-pointer'>MovieWatch</p></Link>
                </div>
                <Search />
                <div className='w-1/4 flex flex-row gap-3 justify-end max-lg:hidden'>
                    <button className='bg-buttonColor py-2 px-3 rounded-md text-white hover:bg-[#2a2e3c]'>Login</button>
                    <button className='bg-buttonColor py-2 px-3 rounded-md text-white hover:bg-[#2a2e3c]'>Register</button>
                </div>
            </div>
            <div className='flex justify-end px-8 py-2 bg-zinc-800 max-sm:px-4'>
                <ul className='flex flex-row gap-6'>
                    <li className='cursor-pointer text-gray-600 hover:text-white'>
                        <Link to='/about'>About</Link>
                    </li>
                    <li className='cursor-pointer text-gray-600 hover:text-white'>
                        <Link to='/contact'>Contact</Link>
                    </li>
                    <li className='cursor-pointer text-gray-600 hover:text-white'>
                        <Link to='/movies/all'>Movies</Link>
                    </li>
                    <li className='cursor-pointer text-gray-600 hover:text-white'>
                        <Link to='/series/all'>Series</Link>
                    </li>
                </ul>
            </div>
        </div>
    )
}
