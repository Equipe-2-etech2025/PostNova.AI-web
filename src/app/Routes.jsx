import React from 'react'
import { BrowserRouter, Routes as Routers, Route } from 'react-router'
import Home from './pages/Home'
import NavBar from '../components/NavBar'
import Login from './pages/Login'
import Register from './pages/register'

const Routes = () => {
    return (
        <BrowserRouter>
            {/* <NavBar /> */}
            <Routers>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
            </Routers>
        </BrowserRouter>
    )
}

export default Routes