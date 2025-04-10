import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react'
import { FiSearch } from "react-icons/fi";
import { MdChevronRight } from "react-icons/md";
import { useNavigate } from 'react-router-dom';
import { AiOutlineClose } from "react-icons/ai";
import { motion, AnimatePresence } from 'framer-motion'

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
                setShow(false);
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

    //mobile style
    const [show, setShow] = useState(false);

    const handleShow = () => {
        setShow(!show);
    };

    return (
        <div className="search-container w-1/2 relative max-sm:flex max-sm:justify-end">
            <form onSubmit={handleSubmit} className='max-sm:hidden'>
                <div className='flex flex-row max-sm:justify-end'>
                    <input type='text'
                        value={query}
                        onChange={handleSearchQuery}
                        placeholder='Search for movies, TV shows, or anime...' className='py-2 px-5 rounded-l-full w-full border-0 bg-gray-100 text-black' />
                    <div className='bg-gray-100 rounded-r-full flex items-center justify-center w-10 border-0'
                        onClick={handleShow}
                    >
                        <FiSearch className='text-black' /></div>
                </div>
            </form>

            <div className='bg-gray-100 rounded-full w-10 border-0 p-3 hidden max-sm:block'
                onClick={handleShow}>
                <FiSearch className='text-black' />
            </div>

            <AnimatePresence>
                {show && (
                    <motion.div
                        initial={{ y: -100, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: -100, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="fixed top-0 left-0 w-full z-[10000] bg-gray-100 p-5"
                        ref={searchRef}
                    >
                        <form onSubmit={handleSubmit}>
                            <div className='flex flex-row border border-gray-400 rounded-full'>
                                <input
                                    type='text'
                                    value={query}
                                    onChange={handleSearchQuery}
                                    placeholder='Search for movies, TV shows, or anime...'
                                    className='py-2 px-5 rounded-l-full w-full bg-gray-100 text-black'
                                />
                                <div className='bg-gray-100 rounded-r-full flex items-center justify-center w-10' onClick={handleShow}>
                                    <AiOutlineClose className='text-black' />
                                </div>
                            </div>
                        </form>
                    </motion.div>
                )}
            </AnimatePresence>

            {error && <p className='text-red-600 pl-5'>{error}</p>}

            {
                query && <>
                    <div ref={searchRef}
                        className="results-container absolute w-full h-72 bg-white top-12 z-[9999] rounded-lg flex flex-col gap-1 p-2 overflow-y-auto max-sm:fixed max-sm:top-20 max-sm:left-0 max-sm:rounded-none">
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
                </>
            }
        </div >
    )
}
