import React from 'react'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom"
import RootLayout from './layouts/RootLayout'
import SpecialCharTest from './pages/SpecialCharTest'
import ResultsPage from './pages/ResultsPage'
import Login from './pages/Login'
import Register from './pages/Register'
import PastResults from './pages/PastResults'

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path='/' element={<RootLayout />}>
            <Route index element={<SpecialCharTest />} />
            <Route path="/results" element={ <ResultsPage />} />
            <Route path='/login' element={ <Login />} />
            <Route path='/register' element={ <Register />} />
            <Route path='/pastresults' element={ <PastResults />} />
        </Route>
    )
)

function App () {
    return (
        <RouterProvider router={router} />
    )
}

export default App


