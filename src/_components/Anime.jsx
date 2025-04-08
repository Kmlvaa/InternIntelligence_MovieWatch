import React, { useEffect, useRef, useState } from 'react'
import { GiHeartInside } from "react-icons/gi";
import { FaPlus } from "react-icons/fa6";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Grid } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/grid';
import { useNavigate } from 'react-router-dom';

const apiKey = process.env.REACT_APP_API_KEY;
const apiUrl = process.env.REACT_APP_BASE_URL;

export default function Anime() {

    const [movies, setMovies] = useState([]);
    const [gridCount, setGridCount] = useState(2);
    const navigate = useNavigate();

    const handleNavigate = (id) => {
        navigate(`/tv/${id}`);
    };

    useEffect(() => {
        fetch(`${apiUrl}/discover/tv?api_key=${apiKey}&with_genres=16&with_original_language=ja`)
            .then((res) => res.json())
            .then((data) => {
                setMovies(data.results);
            })
            .catch((err) => console.log(err))
    }, [])

    const swiperRef = useRef(null);

    const handleMore = () => {
        setGridCount(prev => prev + 1);
    }
    return (
        <div className='pt-8'>
            <div className='border-b border-gray-800 mb-8'>
                <div className='text-white text-lg border-b border-white w-24 flex flex-row items-center gap-2'>
                    <GiHeartInside />
                    <p>Animes</p>
                </div>
            </div>
            <Swiper
                spaceBetween={10}
                slidesPerView={4}
                modules={[Navigation, Grid]}
                ref={swiperRef}
                grid={{
                    rows: gridCount,
                    fill: 'row',
                }}
            >
                {movies?.map((movie) => {
                    return (
                        <SwiperSlide onClick={() => handleNavigate(movie.id)}
                        key={movie.id} className='w-60 h-20 text-white rounded-md cursor-pointer overflow-hidden bg-gray-800 p-2 hover:bg-gray-700'>
                            <div className='flex flex-row gap-2 items-center'>
                                <img
                                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                                    alt={movie.name}
                                    className="h-10 w-10 object-cover rounded-sm "
                                />
                                <div className="px-2">
                                    <h2 className="text-md font-semibold truncate">{movie.name}</h2>
                                    <p className="text-white text-xs">
                                        ⭐ {(movie.vote_average).toFixed(1)}/10
                                    </p>
                                </div>
                            </div>
                        </SwiperSlide>
                    );
                })}
                <div className=' text-white m-auto cursor-pointer mt-5 flex flex-row gap-2 items-center justify-center bg-gray-800 p-2 hover:bg-gray-700' onClick={handleMore}>
                    <FaPlus className='text-sm'/>
                    <p>See More</p>
                </div>
            </Swiper>
        </div>
    )
}
