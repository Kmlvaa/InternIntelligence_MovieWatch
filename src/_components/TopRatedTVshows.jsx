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

export default function TopRatedTVshows() {

    const [movies, setMovies] = useState([]);
    const navigate = useNavigate();

    const handleNavigate = (id) => {
        navigate(`/tv/${id}`);
    };

    useEffect(() => {
        fetch(`${apiUrl}/tv/top_rated?api_key=${apiKey}`)
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
    return (
        <div className='h-full'>
            <div className='border-b border-gray-800 mb-8 flex flex-row items-center justify-between'>
                <div className='text-white text-lg border-b border-white w-48 flex flex-row items-center gap-2'>
                    <FaStar />
                    <p>Top-Rated TV shows</p>
                </div>
                <div className='text-white flex flex-row gap-2 text-sm'>
                    <SlArrowLeft className='cursor-pointer' onClick={handlePrevClick} />
                    <SlArrowRight className='cursor-pointer' onClick={handleNextClick} />
                </div>
            </div>
            <Swiper
                spaceBetween={10}
                slidesPerView={5}
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
                                className="w-full h-36 object-cover object-top rounded-lg transition-transform duration-500 ease-in-out transform hover:scale-125"
                            />
                            <div className="absolute bottom-0 left-0 px-2">
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
