import React, { useEffect, useRef, useState } from 'react'
import { FaStar } from "react-icons/fa";
import { SlArrowRight } from "react-icons/sl";
import { SlArrowLeft } from "react-icons/sl";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import { useNavigate } from 'react-router-dom';

const apiKey = process.env.REACT_APP_API_KEY;
const apiUrl = process.env.REACT_APP_BASE_URL;

export default function TopRatedMovies() {

    const [movies, setMovies] = useState([]);

    useEffect(() => {
        fetch(`${apiUrl}/movie/top_rated?api_key=${apiKey}`)
            .then((res) => res.json())
            .then((data) => setMovies(data.results))
            .catch((err) => console.log(err))
    }, [])

    const swiperRef = useRef(null);

    const handlePrevClick = () => {
        swiperRef.current.swiper.slidePrev();
    };

    const handleNextClick = () => {
        swiperRef.current.swiper.slideNext();
    };

    const navigate = useNavigate();

    const handleNavigate = (id) => {
        navigate(`/movie/${id}`);
    };

    return (
        <div className='h-full'>
            <div className='border-b border-gray-800 mb-8 flex flex-row items-center justify-between'>
                <div className='text-white text-lg border-b border-white w-44 flex flex-row items-center gap-2'>
                    <FaStar />
                    <p>Top-Rated movies</p>
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
                        slidesPerView: 5,
                    },
                    // Default for smaller screens (<640px)
                    0: {
                        slidesPerView: 4,
                    },
                }}
                loop={true}
                modules={[Navigation]}
                ref={swiperRef}
            >
                {movies?.map((movie) => {
                    return (
                        <SwiperSlide onClick={() => handleNavigate(movie.id)}
                            key={movie.id} className='w-60 h-36 text-white rounded-lg relative cursor-pointer overflow-hidden'>
                            <img
                                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                                alt={movie.title}
                                className="w-full h-36 object-cover rounded-lg transition-transform duration-500 ease-in-out transform hover:scale-125"
                            />
                            <div className="absolute bottom-0 left-0 px-2">
                                <h2 className="text-lg font-semibold">{movie.title}</h2>
                                <p className="text-white text-xs">
                                    ⭐ {(movie.vote_average).toFixed(1)}/10
                                </p>
                            </div>
                        </SwiperSlide>
                    );
                })}
            </Swiper>
        </div>
    )
}
