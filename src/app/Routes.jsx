import React from 'react'
import { BrowserRouter, Routes as Routers, Route } from 'react-router'
import Home from './pages/Home'
import NavBar from '../components/NavBar'

const Routes = () => {
    return (
        <BrowserRouter>
            <NavBar />
            <Routers>
                <Route path="/" element={<Home />} />
            </Routers>
        </BrowserRouter>
    )
}

export default Routes