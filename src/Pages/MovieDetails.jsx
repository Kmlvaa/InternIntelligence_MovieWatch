import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { FaRegCalendar } from "react-icons/fa";
import { IoLanguage } from "react-icons/io5";
import { FaImdb } from "react-icons/fa";
import { IoMdList } from "react-icons/io";

const apiKey = process.env.REACT_APP_API_KEY;
const apiUrl = process.env.REACT_APP_BASE_URL;

export default function MovieDetails() {
    const { id } = useParams();
    const [movie, setMovie] = useState(null);

    useEffect(() => {
        fetch(`${apiUrl}/movie/${id}?api_key=${apiKey}&language=en-US`)
            .then(res => res.json())
            .then(data => {
                setMovie(data);
                console.log(data)
            })
            .catch(err => console.log(err));
    }, [id]);

    if (!movie) return <p className='text-white font-semibold'>Loading...</p>;

    return (
        <div className="text-white p-4 flex flex-row gap-5">
            <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} className='w-1/3 h-80 object-cover rounded-md' />
            <div className='flex flex-col gap-2'>
                <h1 className="text-3xl font-bold">{movie.title}</h1>
                <p>{movie.overview}</p>
                <p className='text-yellow-700'>{movie.tagline}</p>
                <div className='flex flex-row gap-2 text-sm'>
                    <span className='text-gray-500 flex flex-row gap-1 items-center'>
                        <FaImdb />
                        <p>IMDB point:</p>
                    </span>
                    <p>{(movie?.popularity)?.toFixed(1)} / 10</p>
                </div>
                <div className='flex flex-row gap-2 text-sm'>
                    <span className='text-gray-500 flex flex-row gap-1 items-center'>
                        <FaRegCalendar />
                        <p>Release date:</p>
                    </span>
                    <p>{movie.release_date}</p>
                </div>
                <div className='flex flex-row gap-2 text-sm'>
                    <span className='text-gray-500 flex flex-row gap-1 items-center'>
                        <IoLanguage />
                        <p>Original_language:</p>
                    </span>
                    <p>{movie.original_language}</p>
                </div>
                <div className='flex flex-row gap-2 text-sm'>
                    <span className='text-gray-500 flex flex-row gap-1 items-center'>
                        <IoMdList />
                        <p>Genres:</p>
                    </span>
                    <ul className='flex flex-row gap-2'>
                        {movie.genres?.map((genre) => (
                            <li key={genre.id}>{genre.name || genre.title}, </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    )
}
