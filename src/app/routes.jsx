import React from "react";
import {
	BrowserRouter,
	Routes as Router,
	Route,
	Navigate,
} from "react-router-dom";
import { AuthProvider } from "../contexts/AuthContext";
import ProtectedRoute from "../components/ProtectedRoute";

// Pages
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/register";
import NavBar from "../components/NavBar";
import DashboardUser from "./pages/DashboardUser";
import EmailVerification from "./pages/EmailVerification";
import PasswordResetFlow from "./pages/ResetPassword";
import PolitiqueConfidentialite from "./pages/politiqueConfidentialite";
import ConditionsUtilisation from "./pages/conditionsUtilisation";
import NotFound from "./pages/404";


const routes = [
	/**
	 * Routes publiques
	 * Accessibles sans authentification
	 */
	{ path: "/", element: <Home />, public: true },
	{ path: "/terms-of-use", element: <ConditionsUtilisation />, public: true },
	{ path: "/privacy-policy", element: <PolitiqueConfidentialite />, public: true },
	
	// Authentification
	{ path: "/login", element: <Login />, public: true },
	{ path: "/register", element: <Register />, public: true },

	// Verification email
	{ path: "/email/verify", element: <EmailVerification />, public: true },

	// Réinitialisation mot de passe
	{ path: "/reset-password", element: <PasswordResetFlow />, public: true },


	/**
	 * Routes protégées
	 * Nécessitant une authentification d'utilisateur
	 */
	{ path: "/dashboard", element: <DashboardUser /> },

	/**
	 * Routes administratives
	 * Réservées aux administrateurs
	 */
	// { path: "/admin", element: <Navigate to="/dashboard" replace />, admin: true },

	/**
	 * Pages d'erreur
	 */
	{ path: "*", element: <NotFound /> },

	
];

export default routes;
