import React from 'react'
import Header from './Header'
import Footer from './Footer'
import { Outlet } from 'react-router-dom'

export default function Layout() {
    return (
        <div className='bg-layoutBG w-4/5 h-full m-auto'>
            <Header />
            <div className='px-8 py-5 h-full'>
                <Outlet />
            </div>
            <Footer />
        </div>
    )
}
