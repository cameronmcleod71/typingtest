import React, { useEffect } from 'react'
import { Outlet } from "react-router-dom"
import Navbar from '../components/Navbar'
import { getAuth } from '../utils/auth'

export default function RootLayout() {
    try {
        getAuth();
    } catch {
    }

    return (
        <div>
            <Navbar />
            <Outlet />
        </div>
    )
}