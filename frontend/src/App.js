import React from 'react'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom"
import RootLayout from './layouts/RootLayout'
import SpecialCharTest from './pages/SpecialCharTest'
import ResultsPage from './pages/ResultsPage'
import Login from './pages/Login'
import Register from './pages/Register'
import PastResults from './pages/PastResults'
import Profile from './pages/Profile'
import ProgrammingTTest from './pages/ProgrammingTTest'
import PrivateRoutes from './components/routes/PrivateRoutes'


const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path='/' element={<RootLayout />}>
            <Route index element={<SpecialCharTest />} />
            <Route path="/programmer" element={<ProgrammingTTest />} />
            <Route path="/results" element={ <ResultsPage />} />
            <Route path='/login' element={ <Login />} />
            <Route path='/register' element={ <Register />} />
            <Route element={ <PrivateRoutes /> }>
                <Route path='/pastresults' element={ <PastResults />} />
                <Route path='/myaccount' element={ <Profile />} />
            </Route>
        </Route>
    )
)

function App () {
    return (
        <RouterProvider router={router} />
    )
}

export default App


