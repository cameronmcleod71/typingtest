import { Box, Divider } from '@chakra-ui/react';
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

        <Box bg="#1F2430" fontFamily="Iosevka">
            <Navbar />
            <Divider borderColor="#1F2430"/>
            <Outlet />
        </Box>

    )
}