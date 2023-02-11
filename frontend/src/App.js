import React from 'react'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom"
import RootLayout from './layouts/RootLayout'
import SpecialCharTest from './pages/SpecialCharTest'

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path='/' elements={ <RootLayout />}>
            <Route index element={ <SpecialCharTest />} />
        </Route>
    )
)

function App () {
    return (
        <RouterProvider router={router} />
    )
}

export default App


