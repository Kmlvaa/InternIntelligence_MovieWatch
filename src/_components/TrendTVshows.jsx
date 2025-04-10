import React, { useEffect, useRef, useState } from 'react'
import { FaFire } from "react-icons/fa6";
import { SlArrowRight } from "react-icons/sl";
import { SlArrowLeft } from "react-icons/sl";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import { useNavigate } from 'react-router-dom';

const apiKey = process.env.REACT_APP_API_KEY;
const apiUrl = process.env.REACT_APP_BASE_URL;

export default function TopTVshows() {

    const [movies, setMovies] = useState([]);
    const swiperRef = useRef(null);
    const navigate = useNavigate();

    const handleNavigate = (id) => {
        navigate(`/tv/${id}`);
    };

    useEffect(() => {
        fetch(`${apiUrl}/trending/tv/week?api_key=${apiKey}`)
            .then((res) => res.json())
            .then((data) => setMovies(data.results))
            .catch((err) => console.log(err))
    }, [])


    const handlePrevClick = () => {
        if (swiperRef.current && swiperRef.current.swiper) {
            swiperRef.current.swiper.slidePrev();
        }
    };

    const handleNextClick = () => {
        if (swiperRef.current && swiperRef.current.swiper) {
            swiperRef.current.swiper.slideNext();
        }
    };
    return (
        <div className='py-10'>
            <div className='border-b border-gray-800 mb-8 flex flex-row items-center justify-between'>
                <div className='text-white text-lg border-b border-white w-48 flex flex-row items-center gap-2'>
                    <FaFire />
                    <p>Trending TV shows</p>
                </div>
                <div className='text-white flex flex-row gap-2 text-sm'>
                    <SlArrowLeft className='cursor-pointer' onClick={handlePrevClick} />
                    <SlArrowRight className='cursor-pointer' onClick={handleNextClick} />
                </div>
            </div>
            <Swiper
                spaceBetween={10}
                breakpoints={{
                    // When screen width is >= 640px (sm)
                    640: {
                        slidesPerView: 4,
                    },
                    // When screen width is >= 768px (md)
                    768: {
                        slidesPerView: 4,
                    },
                    // When screen width is >= 1024px (lg)
                    1024: {
                        slidesPerView: 7,
                    },
                    // Default for smaller screens (<640px)
                    0: {
                        slidesPerView: 3,
                    },
                }}
                loop={true}
                modules={[Navigation]}
                ref={swiperRef}
            >
                {movies?.map((movie) => {
                    return (
                        <SwiperSlide onClick={() => handleNavigate(movie.id)}
                            key={movie.id} className='w-40 h-72 text-white rounded-lg relative cursor-pointer overflow-hidden'>
                            <img
                                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                                alt={movie.title}
                                className="w-full h-72 object-cover rounded-lg transition-transform duration-500 ease-in-out transform hover:scale-125"
                            />
                            <div className="absolute top-0 left-0 px-2">
                                <h2 className="text-lg font-semibold truncate">{movie.title}</h2>
                                <p className="text-white text-xs">
                                    ⭐ {(movie.vote_average).toFixed(1)}/10 | {movie.release_date}
                                </p>
                            </div>
                        </SwiperSlide>
                    );
                })}
            </Swiper>
        </div>
    )
}
