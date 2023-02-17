import React from 'react'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom"
import RootLayout from './layouts/RootLayout'
import SpecialCharTest from './pages/SpecialCharTest'
import ResultsPage from './pages/ResultsPage'

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path='/' elements={<RootLayout />}>
            <Route index element={<SpecialCharTest />} />
            <Route path="/results" element={ <ResultsPage />} />
        </Route>
    )
)

function App () {
    return (
        <RouterProvider router={router} />
    )
}

export default App


