import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react'
import { FiSearch } from "react-icons/fi";
import { MdChevronRight } from "react-icons/md";
import { useNavigate } from 'react-router-dom';

const apiKey = process.env.REACT_APP_API_KEY;
const apiUrl = process.env.REACT_APP_BASE_URL;

export default function Search() {

    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const searchRef = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (searchRef.current && !searchRef.current.contains(event.target)) {
                setQuery('');
                setResults([]);
            }
        }
        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    useEffect(() => {
        if (query === '') return;

        setLoading(true);
        setError(null);

        axios.get(`${apiUrl}/search/movie?api_key=${apiKey}&query=${query}&language=en-US`)
            .then(response => {
                setResults(response.data.results);
            })
            .catch(err => {
                setError('Failed to fetch movies!');
                console.log(err);
            })
    }, [query])

    const handleSearchQuery = (e) => {
        setQuery(e.target.value);
    }

    const handleSubmit = (id) => {

        navigate(`/movie/${id}`);
        setQuery('');
        setResults([]);
    }

    return (
        <div className="search-container w-1/2 relative">
            <form onSubmit={handleSubmit}>
                <div className='flex flex-row'>
                    <input type='text'
                        value={query}
                        onChange={handleSearchQuery}
                        placeholder='Search for movies, TV shows, or anime...' className='py-2 px-5 rounded-l-full w-full' />
                    <div className='bg-white rounded-r-full flex items-center justify-center w-10'><FiSearch className='text-black' /></div>
                </div>
            </form>

            {error && <p className='text-red-600 pl-5'>{error}</p>}

            {query && <>
                <div ref={searchRef}
                    className="results-container absolute w-full h-72 bg-white top-12 z-[9999] rounded-lg flex flex-col gap-1 p-2 overflow-y-auto">
                    {query.length != 0 && results.length === 0 && !loading && !error && (
                        <p>No results found. Try searching something else.</p>
                    )}

                    {results?.map((item) => (
                        <div key={item.id}
                            onClick={() => handleSubmit(item.id)}
                            className="result-item cursor-pointer group flex flex-row items-center justify-between hover:bg-gray-200 rounded-md p-2">
                            <div className='flex flex-row items-center gap-3 text-black'>
                                <img
                                    src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
                                    alt={item.title || item.name}
                                    className="w-10 h-10 rounded-md"
                                />
                                <div className="result-details">
                                    <h3 className='font-semibold'>{item.title || item.name}</h3>
                                </div>
                            </div>
                            <div className=' hidden group-hover:block'>
                                <MdChevronRight />
                            </div>
                        </div>
                    ))}
                </div>
            </>}
        </div>
    )
}
