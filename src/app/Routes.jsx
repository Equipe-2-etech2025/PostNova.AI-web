import React from 'react'
import { BrowserRouter, Routes as Router, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from '../contexts/AuthContext'
import ProtectedRoute from '../components/ProtectedRoute'

// Pages
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/register'
import DashboardUser from './pages/DashboardUser'

import NavBar from '../components/NavBar'

const Routes = () => {
    return (
        <AuthProvider>
            <BrowserRouter>
                <Router>
                    {/* Routes publiques */}
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    
                    {/* Routes protégées */}
                    <Route 
                        path="/dashboard" 
                        element={
                            <ProtectedRoute>
                                <DashboardUser />
                            </ProtectedRoute>
                        } 
                    />
                    
                    {/* Redirection par défaut pour les utilisateurs connectés */}
                    <Route path="/home" element={<Navigate to="/dashboard" replace />} />
                </Router>
            </BrowserRouter>
        </AuthProvider>
    )
}

export default Routes
