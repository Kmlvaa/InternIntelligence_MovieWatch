import React from 'react'
import TrendMovies from '../_components/TrendMovies';
import TrendTVshows from '../_components/TrendTVshows';
import TopRated from '../_components/TopRatedMovies';
import TopRatedTVshows from '../_components/TopRatedTVshows.jsx';
import UpcomingMovies from '../_components/UpcomingMovies.jsx';
import Anime from '../_components/Anime.jsx';

export default function Home() {
    return (
        <div className='h-auto'>
            <TrendMovies />
            <TopRated />
            <TrendTVshows />
            <TopRatedTVshows />
            <Anime />
            <UpcomingMovies />
        </div>
    )
}
