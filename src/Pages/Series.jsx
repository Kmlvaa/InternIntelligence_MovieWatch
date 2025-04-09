import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaFire } from "react-icons/fa6";
import { FaPlus } from "react-icons/fa6";
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Grid, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';

const apiKey = process.env.REACT_APP_API_KEY;
const apiUrl = process.env.REACT_APP_BASE_URL;

export default function Movies() {

    const [searchParams, setSearchParams] = useSearchParams();

    const [trendMovies, setTrendMovies] = useState([]);
    const [filteredTrendMovies, setFilteredTrendMovies] = useState([]);

    const [topMovies, setTopMovies] = useState([]);
    const [filteredTopMovies, setFilteredTopMovies] = useState([]);

    const [upcomingMovies, setUpcomingMovies] = useState([]);
    const [filteredUpcomingMovies, setFilteredUpcomingMovies] = useState([]);

    const [selectedGenre, setSelectedGenre] = useState(searchParams.get('genre') || '');
    const [minRating, setMinRating] = useState(Number(searchParams.get('rating')) || 0);
    const [releaseYear, setReleaseYear] = useState(searchParams.get('year') || '');

    const [movieGenres, setMovieGenres] = useState([]);

    const [gridCount, setGridCount] = useState(4);

    useEffect(() => {
        const fetchGenres = async () => {
            try {
                const res = await axios.get(`${apiUrl}/genre/movie/list?api_key=${apiKey}&language=en-US`);
                setMovieGenres(res.data.genres);
            } catch (err) {
                console.error('Error fetching genres:', err);
            }
        };
        fetchGenres();
    }, []);

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const res1 = await axios.get(`${apiUrl}/trending/tv/week?api_key=${apiKey}`);
                setTrendMovies(res1.data.results);

                const res2 = await axios.get(`${apiUrl}/tv/top_rated?api_key=${apiKey}`);
                setTopMovies(res2.data.results);

                const res3 = await axios.get(`${apiUrl}/discover/tv?api_key=${apiKey}&with_genres=16&with_original_language=ja`);
                setUpcomingMovies(res3.data.results);

            } catch (err) {
                console.error('Error fetching movies:', err);
            }
        };
        fetchMovies();
    }, []);

    useEffect(() => {
        const filtered1 = trendMovies.filter(movie => {
            const matchedGenre = selectedGenre ? movie.genre_ids?.includes(parseInt(selectedGenre)) : true;
            const matchedRating = movie.vote_average >= minRating;
            const matchedYear = releaseYear ? movie.release_date?.startsWith(releaseYear) : true;

            return matchedGenre && matchedRating && matchedYear;
        });

        const filtered2 = topMovies.filter(movie => {
            const matchedGenre = selectedGenre ? movie.genre_ids?.includes(parseInt(selectedGenre)) : true;
            const matchedRating = movie.vote_average >= minRating;
            const matchedYear = releaseYear ? movie.release_date?.startsWith(releaseYear) : true;

            return matchedGenre && matchedRating && matchedYear;
        });

        const filtered3 = upcomingMovies.filter(movie => {
            const matchedGenre = selectedGenre ? movie.genre_ids?.includes(parseInt(selectedGenre)) : true;
            const matchedRating = movie.vote_average >= minRating;
            const matchedYear = releaseYear ? movie.release_date?.startsWith(releaseYear) : true;

            return matchedGenre && matchedRating && matchedYear;
        });

        setFilteredTrendMovies(filtered1);
        setFilteredTopMovies(filtered2);
        setFilteredUpcomingMovies(filtered3);

        // Update URL
        const params = {};
        if (selectedGenre) params.genre = selectedGenre;
        if (minRating) params.rating = minRating;
        if (releaseYear) params.year = releaseYear;
        setSearchParams(params);

    }, [selectedGenre, minRating, releaseYear, trendMovies, topMovies, upcomingMovies]);

    // Reset filters
    const handleReset = () => {
        setSelectedGenre('');
        setMinRating(0);
        setReleaseYear('');
        setSearchParams({});
    };

    const handleMore = () => {
        setGridCount((prev) => prev + 1);
    }

    const navigate = useNavigate();

    const handleNavigate = (id) => {
        navigate(`/tv/${id}`);
    };

    return (
        <div>
            <div className="flex flex-col gap-4 md:flex-row md:items-center mb-5">
                <select
                    className="p-2 bg-[#2a2e3c] text-white rounded"
                    value={selectedGenre}
                    onChange={(e) => setSelectedGenre(e.target.value)}
                >
                    <option value="">All Genres</option>
                    {movieGenres.map((genre) => (
                        <option key={genre.id} value={genre.id}>{genre.name}</option>
                    ))}
                </select>

                <input
                    type="number"
                    min="0"
                    max="10"
                    step="0.1"
                    placeholder="Minimum IMDb rating"
                    className="p-2 bg-[#2a2e3c] text-white rounded"
                    value={minRating}
                    onChange={(e) => setMinRating(Number(e.target.value))}
                />

                <input
                    type="text"
                    placeholder="Year (e.g. 2020)"
                    className="p-2 bg-[#2a2e3c] text-white rounded"
                    value={releaseYear}
                    onChange={(e) => setReleaseYear(e.target.value)}
                />
                <button
                    onClick={handleReset}
                    className="p-2 px-4 bg-red-600 hover:bg-red-500 text-white rounded"
                >
                    Reset
                </button>
            </div>

            <div className='border-b border-gray-800 mb-8 flex flex-row items-center justify-between'>
                <div className='text-white text-lg border-b border-white w-40 flex flex-row items-center gap-2'>
                    <FaFire />
                    <p>Movies</p>
                </div>
            </div>
            <Swiper
                spaceBetween={10}
                slidesPerView={5}
                modules={[Navigation, Grid]}
                grid={{
                    rows: gridCount,
                    fill: 'row',
                }}
            >
                {[...filteredTopMovies, ...filteredTrendMovies, ...filteredUpcomingMovies]?.map((movie) => {
                    return (
                        <SwiperSlide onClick={() => handleNavigate(movie.id)}
                            key={movie.id} className="bg-[#2a2e3c] text-white rounded-lg cursor-pointer h-80 transition-transform duration-500 ease-in-out transform hover:bg-[#495057]"
                        >
                            <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} className='object-cover h-72 w-full rounded-lg' />
                            <div className="p-2">
                                <h2 className="font-semibold">{movie.title}</h2>
                                <p>⭐ {movie.vote_average}</p>
                                <p>📅 {movie.release_date}</p>
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
    );
}
