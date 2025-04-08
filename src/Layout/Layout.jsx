import React from 'react'
import Header from './Header'
import Footer from './Footer'
import { Outlet } from 'react-router-dom'

export default function Layout() {
    return (
        <div className='bg-gradient-to-r from-zinc-800 via-neutral-700 via-neutral-800 to-zinc-950 w-5/6 h-full m-auto rounded-lg'>
            <Header />
            <div className='px-8 py-5 h-full'>
                <Outlet />
            </div>
            <Footer />
        </div>
    )
}
