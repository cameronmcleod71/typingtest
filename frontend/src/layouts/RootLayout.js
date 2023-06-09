import { Box, Divider, Container } from '@chakra-ui/react';
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

        <Box bg="customBackground" fontFamily="Iosevka" boxSizing="border-box">
            <Container boxSizing="border-box" maxWidth="4xl">
                <Navbar />
                <Outlet />
            </Container>
        </Box>

    )
}