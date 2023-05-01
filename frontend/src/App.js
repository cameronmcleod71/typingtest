import React from 'react'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom"
import RootLayout from './layouts/RootLayout'
import SpecialCTypingTestContainer from './pages/SpecialCTypingTestContainer'
import ResultsPage from './pages/ResultsPage'
import Login from './pages/Login'
import Register from './pages/Register'
import PastResults from './pages/PastResults'
import Profile from './pages/Profile'
import PrivateRoutes from './components/routes/PrivateRoutes'
import Leaderboard from './pages/Leaderboard'
import ProgrammingTypingTestContainer from './pages/ProgrammingTypingTestContainer'
import TestLayout from './pages/testLayout'


const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path='/' element={<RootLayout />}>
            <Route index element={<SpecialCTypingTestContainer />} />
            <Route path="/programmer" element={<ProgrammingTypingTestContainer />} />
            <Route path="/leaderboard" element={<Leaderboard /> } />
            <Route path="/results" element={ <ResultsPage />} />
            <Route path='/login' element={ <Login />} />
            <Route path='/register' element={ <Register />} />
            <Route element={ <PrivateRoutes /> }>
                <Route path='/pastresults' element={ <PastResults />} />
                <Route path='/myaccount' element={ <Profile />} />
            </Route>
            <Route path="/test" element={<TestLayout />} />
        </Route>
    )
)

function App () {
    return (
        <RouterProvider router={router} />
    )
}

export default App


