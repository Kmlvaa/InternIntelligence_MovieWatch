import React, { useEffect, useState } from 'react'
import { FaFacebookF } from "react-icons/fa6";
import { GrInstagram } from "react-icons/gr";
import { FaTwitter } from "react-icons/fa";
import { BiLogoTelegram } from "react-icons/bi";
import axios from 'axios';

const apiKey = process.env.REACT_APP_API_KEY;
const apiUrl = process.env.REACT_APP_BASE_URL;

export default function Footer() {

    const [movieGenres, setMovieGenres] = useState([]);
    const [TVGenres, setTVGenres] = useState([]);

    useEffect(() => {
        const fetchGenres = async () => {
            try {
                // Fetch movie genres
                const movieResponse = await axios.get(
                    `https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}&language=en-US`
                );
                setMovieGenres(movieResponse.data.genres);

                // Fetch TV genres
                const tvResponse = await axios.get(
                    `https://api.themoviedb.org/3/genre/tv/list?api_key=${apiKey}&language=en-US`
                );
                setTVGenres(tvResponse.data.genres);
            } catch (err) {
                console.error('Error fetching genres:', err);
            }
        };

        fetchGenres();
    }, [])

    return (
        <div className='w-full h-full border-t border-gray-800 px-8 my-10 py-5 max-md:my-0 max-sm:px-4'>
            <div className='flex flex-row gap-5 items-center justify-between max-md:flex-col max-md:items-start mb-4'>
                <div className='w-4/5 max-md:w-full'>
                    <div className='flex flex-row items-center justify-between my-10 max-sm:hidden'>
                        <div>
                            <p className='text-white font-bold text-2xl cursor-pointer'>MovieWatch</p>
                        </div>
                    </div>
                    <div className='flex flex-row items-center justify-between gap-5 mb-4'>
                        <div>
                            <p className='text-white font-semibold text-lg mb-3 max-lg:text-md max-md:text-sm'>Popular movie genres</p>
                            <div className='flex flex-row gap-10 text-gray-600 max-sm:gap-5'>
                                <ul>
                                    {movieGenres?.map((genre) => {
                                        return (
                                            <li key={genre.id} className='hover:text-white cursor-pointer max-lg:text-sm max-md:text-xs'>{genre.name}</li>
                                        );
                                    }).slice(0, 6)}
                                </ul>
                                <ul>
                                    {movieGenres?.map((genre) => {
                                        return (
                                            <li key={genre.id} className='hover:text-white cursor-pointer max-lg:text-sm max-md:text-xs'>{genre.name}</li>
                                        );
                                    }).slice(6, 12)}
                                </ul>
                            </div>
                        </div>
                        <div>
                            <p className='text-white font-semibold text-lg mb-3 max-lg:text-md max-md:text-sm'>Popular TV shows genres</p>
                            <div className='flex flex-row gap-10 text-gray-600 max-sm:gap-4'>
                                <ul>
                                    {TVGenres?.map((genre) => {
                                        return (
                                            <li key={genre.id} className='hover:text-white cursor-pointer max-lg:text-sm max-md:text-xs'>{genre.name}</li>
                                        );
                                    }).slice(0, 6)}
                                </ul>
                                <ul>
                                    {TVGenres?.map((genre) => {
                                        return (
                                            <li key={genre.id} className='hover:text-white cursor-pointer max-lg:text-sm max-md:text-xs'>{genre.name}</li>
                                        );
                                    }).slice(6, 12)}
                                </ul>
                            </div>
                        </div>
                        <div className='max-xl:hidden'>
                            <p className='text-white font-semibold text-lg mb-3 max-lg:text-md'>Popular movies and series</p>
                            <div className='flex flex-row gap-10 text-gray-600 max-lg:text-sm'>
                                <ul>
                                    <li className='hover:text-white cursor-pointer'>Love</li>
                                    <li className='hover:text-white cursor-pointer'>Horror</li>
                                    <li className='hover:text-white cursor-pointer'>Action</li>
                                    <li className='hover:text-white cursor-pointer'>Comedy</li>
                                    <li className='hover:text-white cursor-pointer'>Animated</li>
                                    <li className='hover:text-white cursor-pointer'>Drama</li>
                                </ul>
                                <ul>
                                    <li className='hover:text-white cursor-pointer'>Love series</li>
                                    <li className='hover:text-white cursor-pointer'>Horror series</li>
                                    <li className='hover:text-white cursor-pointer'>Action series</li>
                                    <li className='hover:text-white cursor-pointer'>Comedy series</li>
                                    <li className='hover:text-white cursor-pointer'>Animated</li>
                                    <li className='hover:text-white cursor-pointer'>Drama series</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='flex flex-col items-start justify-center gap-5 max-md:grid max-md:grid-cols-2 max-md:justify-between max-md:w-full'>
                    <div className='flex flex-row gap-2 items-center cursor-pointer group'>
                        <div className='rounded-full bg-buttonColor p-4 group-hover:bg-buttonColorHover text-white max-sm:p-3'><FaFacebookF /></div>
                        <div className='flex flex-col items-start'>
                            <p className='text-white font-semibold max-md:text-sm'>Facebook</p>
                            <p className='text-gray-600 max-md:text-xs'>Like</p>
                        </div>
                    </div>
                    <div className='flex flex-row gap-2 items-center cursor-pointer group'>
                        <div className='rounded-full bg-buttonColor p-4 group-hover:bg-buttonColorHover text-white max-sm:p-3'><GrInstagram /></div>
                        <div className='flex flex-col items-start'>
                            <p className='text-white font-semibold max-md:text-sm'>Instagram</p>
                            <p className='text-gray-600 max-md:text-xs'>Follow</p>
                        </div>
                    </div>
                    <div className='flex flex-row gap-2 items-center cursor-pointer group'>
                        <div className='rounded-full bg-buttonColor p-4 group-hover:bg-buttonColorHover text-white max-sm:p-3'><FaTwitter /></div>
                        <div className='flex flex-col items-start'>
                            <p className='text-white font-semibold max-md:text-sm'>Twitter</p>
                            <p className='text-gray-600 max-md:text-xs'>Follow</p>
                        </div>
                    </div>
                    <div className='flex flex-row gap-2 items-center cursor-pointer group'>
                        <div className='rounded-full bg-buttonColor p-4 group-hover:bg-buttonColorHover text-white max-sm:p-3'><BiLogoTelegram /></div>
                        <div className='flex flex-col items-start'>
                            <p className='text-white font-semibold max-md:text-sm'>Telegram</p>
                            <p className='text-gray-600 max-md:text-xs'>Follow</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className='border-t border-gray-800 text-gray-600 pt-8 flex items-center justify-center'>
                <p className='w-auto text-sm'>Developed by Samira Kamilova</p>
            </div>
        </div>
    )
}
