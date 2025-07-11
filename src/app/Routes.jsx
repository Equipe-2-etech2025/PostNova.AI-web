import React from 'react'
import { BrowserRouter, Routes as Routers, Route } from 'react-router'
import Home from './pages/Home'

const Routes = () => {
    return (
        <BrowserRouter>
            <Routers>
                <Route path="/" element={<Home />} />
            </Routers>
        </BrowserRouter>
    )
}

export default Routes