import React from 'react'
import { FaFacebookF } from "react-icons/fa6";
import { GrInstagram } from "react-icons/gr";
import { FaTwitter } from "react-icons/fa";
import { BiLogoTelegram } from "react-icons/bi";

export default function Footer() {
    return (
        <div className='w-full h-full border-t border-gray-800 px-8 py-5'>
            <div className='flex flex-row items-center justify-between mb-6'>
                <div className='w-1/4'>
                    <p className='text-white font-bold text-2xl cursor-pointer'>MovieWatch</p>
                </div>
                <div className='flex flex-row items-center justify-center gap-5'>
                    <div className='flex flex-row gap-2 items-center cursor-pointer group'>
                        <div className='rounded-full bg-buttonColor p-4 group-hover:bg-buttonColorHover text-white'><FaFacebookF /></div>
                        <div className='flex flex-col items-start'>
                            <p className='text-white font-semibold'>Facebook</p>
                            <p className='text-gray-600'>Like</p>
                        </div>
                    </div>
                    <div className='flex flex-row gap-2 items-center cursor-pointer group'>
                        <div className='rounded-full bg-buttonColor p-4 group-hover:bg-buttonColorHover text-white'><GrInstagram /></div>
                        <div className='flex flex-col items-start'>
                            <p className='text-white font-semibold'>Instagram</p>
                            <p className='text-gray-600'>Follow</p>
                        </div>
                    </div>
                    <div className='flex flex-row gap-2 items-center cursor-pointer group'>
                        <div className='rounded-full bg-buttonColor p-4 group-hover:bg-buttonColorHover text-white'><FaTwitter /></div>
                        <div className='flex flex-col items-start'>
                            <p className='text-white font-semibold'>Twitter</p>
                            <p className='text-gray-600'>Follow</p>
                        </div>
                    </div>
                    <div className='flex flex-row gap-2 items-center cursor-pointer group'>
                        <div className='rounded-full bg-buttonColor p-4 group-hover:bg-buttonColorHover text-white'><BiLogoTelegram /></div>
                        <div className='flex flex-col items-start'>
                            <p className='text-white font-semibold'>Telegram</p>
                            <p className='text-gray-600'>Follow</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className='flex flex-row items-center justify-between mb-6'>
                <div>
                    <p className='text-white font-semibold text-lg mb-3'>Popular types</p>
                    <div className='flex flex-row gap-10 text-gray-600'>
                        <ul>
                            <li className='hover:text-white cursor-pointer'>Love films</li>
                            <li className='hover:text-white cursor-pointer'>Horror movies</li>
                            <li className='hover:text-white cursor-pointer'>Action movies</li>
                            <li className='hover:text-white cursor-pointer'>Comedy movies</li>
                            <li className='hover:text-white cursor-pointer'>Animated movies</li>
                        </ul>
                        <ul>
                            <li className='hover:text-white cursor-pointer'>Love series</li>
                            <li className='hover:text-white cursor-pointer'>Horror series</li>
                            <li className='hover:text-white cursor-pointer'>Action series</li>
                            <li className='hover:text-white cursor-pointer'>Comedy series</li>
                            <li className='hover:text-white cursor-pointer'>Animated series</li>
                        </ul>
                    </div>
                </div>
                <div>
                    <p className='text-white font-semibold text-lg mb-3'>Featured movies and series</p>
                    <div className='flex flex-row gap-10 text-gray-600'>
                        <ul>
                            <li className='hover:text-white cursor-pointer'>Love films</li>
                            <li className='hover:text-white cursor-pointer'>Horror movies</li>
                            <li className='hover:text-white cursor-pointer'>Action movies</li>
                            <li className='hover:text-white cursor-pointer'>Comedy movies</li>
                            <li className='hover:text-white cursor-pointer'>Animated movies</li>
                        </ul>
                        <ul>
                            <li className='hover:text-white cursor-pointer'>Love series</li>
                            <li className='hover:text-white cursor-pointer'>Horror series</li>
                            <li className='hover:text-white cursor-pointer'>Action series</li>
                            <li className='hover:text-white cursor-pointer'>Comedy series</li>
                            <li className='hover:text-white cursor-pointer'>Animated series</li>
                        </ul>
                    </div>
                </div>
                <div>
                    <p className='text-white font-semibold text-lg mb-3'>Popular movies and series</p>
                    <div className='flex flex-row gap-10 text-gray-600'>
                        <ul>
                            <li className='hover:text-white cursor-pointer'>Love films</li>
                            <li className='hover:text-white cursor-pointer'>Horror movies</li>
                            <li className='hover:text-white cursor-pointer'>Action movies</li>
                            <li className='hover:text-white cursor-pointer'>Comedy movies</li>
                            <li className='hover:text-white cursor-pointer'>Animated movies</li>
                        </ul>
                        <ul>
                            <li className='hover:text-white cursor-pointer'>Love series</li>
                            <li className='hover:text-white cursor-pointer'>Horror series</li>
                            <li className='hover:text-white cursor-pointer'>Action series</li>
                            <li className='hover:text-white cursor-pointer'>Comedy series</li>
                            <li className='hover:text-white cursor-pointer'>Animated series</li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className='border-t border-gray-800 text-gray-600 py-5 flex items-center justify-center'>
                <p className='w-auto text-sm'>Developed by Samira Kamilova</p>
            </div>
        </div>
    )
}
