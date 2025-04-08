import React, { useEffect, useRef, useState } from 'react'
import { FaFire } from "react-icons/fa6";
import { FaPlus } from "react-icons/fa6";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Grid, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import { useNavigate } from 'react-router-dom';

const apiKey = process.env.REACT_APP_API_KEY;
const apiUrl = process.env.REACT_APP_BASE_URL;

export default function Movies() {

    const [Trendmovies, setTrendMovies] = useState([]);
    const [TopMovies, setTopMovies] = useState([]);
    const [UpcomingMovies, setUpcomingMovies] = useState([]);
    const [gridCount, setGridCount] = useState(4);
    const navigate = useNavigate();

    const handleNavigate = (id) => {
        navigate(`/movie/${id}`);
    };

    useEffect(() => {
        fetch(`${apiUrl}/movie/top_rated?api_key=${apiKey}`)
            .then((res) => res.json())
            .then((data) => setTrendMovies(data.results))
            .catch((err) => console.log(err))
    }, []);
    useEffect(() => {
        fetch(`${apiUrl}/trending/movie/week?api_key=${apiKey}`)
            .then((res) => res.json())
            .then((data) => setTopMovies(data.results))
            .catch((err) => console.log(err))
    }, []);
    useEffect(() => {
        fetch(`${apiUrl}/movie/upcoming?api_key=${apiKey}`)
            .then((res) => res.json())
            .then((data) => setUpcomingMovies(data.results))
            .catch((err) => console.log(err))
    }, [])

    const swiperRef = useRef(null);

    const handleMore = () => {
        setGridCount((prev) => prev + 1);
    }

    return (
        <div className='mb-8'>
            <div className='border-b border-gray-800 mb-8 flex flex-row items-center justify-between'>
                <div className='text-white text-lg border-b border-white w-40 flex flex-row items-center gap-2'>
                    <FaFire />
                    <p>Movies</p>
                </div>
            </div>
            <Swiper
                spaceBetween={10}
                slidesPerView={7}
                modules={[Navigation, Grid]}
                grid={{
                    rows: gridCount,
                    fill: 'row',
                }}
            >
                {[...Trendmovies, ...TopMovies, ...UpcomingMovies]?.map((movie) => {
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
                <div className=' text-white m-auto cursor-pointer mt-5 flex flex-row gap-2 items-center justify-center bg-gray-800 p-2 hover:bg-gray-700' onClick={handleMore}>
                    <FaPlus className='text-sm' />
                    <p>See More</p>
                </div>
            </Swiper>
        </div>
    )
}
