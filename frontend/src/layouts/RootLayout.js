import React, { useEffect } from 'react'
import { Outlet } from "react-router-dom"
import Navbar from '../components/Navbar'
import { useSelector, useDispatch } from "react-redux"
import { changeAuth } from '../redux/auth'
import { setUsername } from '../redux/user'

export default function RootLayout() {
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
    const dispatch = useDispatch();
    fetch('api/auth', {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
        },
    })
    .then((response) =>
        response.json())
    .then((data) => {
        console.log(data);
        // if data is succes, set isauth to true else false
        if (data.isAuthenticated && data.isAuthenticated === 'success') {
            dispatch(changeAuth(true));
            dispatch(setUsername(data.username));
        } else {
            dispatch(changeAuth(false));
        }
    })
    .catch((err) =>
        console.log(err)
    )

    
    return (
        <div>
            <Navbar />
            <Outlet />
        </div>
    )
}