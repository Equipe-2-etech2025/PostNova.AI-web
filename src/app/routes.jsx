import React from "react";

import { Login, Register } from "@pages/auth";
import {
	EmailVerification,
	Home,
	PrivacyPolicyPage,
	ResetPassword,
	TermsOfUse,
	UserProfile,
} from "@pages/public";
import Dashboard from "@pages/Dashboard";

const routes = [
	/**
	 * Routes publiques
	 * Accessibles sans authentification
	 */
	{ path: "/", element: <Home />, public: true },
	{ path: "/terms-of-use", element: <TermsOfUse />, public: true },
	{ path: "/privacy-policy", element: <PrivacyPolicyPage />, public: true },

	// Authentification
	{ path: "/login", element: <Login />, public: true },
	{ path: "/register", element: <Register />, public: true },

	// Verification email
	{ path: "/email/verify", element: <EmailVerification />, public: true },

	// Réinitialisation mot de passe
	{ path: "/reset-password", element: <ResetPassword />, public: true },

	/**
	 * Routes protégées
	 * Nécessitant une authentification d'utilisateur
	 */
	{ path: "/dashboard", element: <Dashboard /> },

	{ path: "/userProfile", element: <UserProfile /> },

	/**
	 * Routes administratives
	 * Réservées aux administrateurs
	 */
	// { path: "/admin", element: <Navigate to="/dashboard" replace />, admin: true },
];

export default routes;
