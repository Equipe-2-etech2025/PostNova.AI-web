import React from "react";

import { Login, Register } from "@pages/auth";
import NotFound from "./pages/404";
import {
	EmailVerification,
	Home,
	PrivacyPolicyPage,
	ResetPassword,
	TermsOfUse,
} from "@pages/public";
import Dashboard from "@pages/Dashboard";
import UserProfile from "@pages/userProfile/UserProfile";
import ChangePassword from "@pages/userProfile/ChangePassword";
import TemplatesExplorer from "@pages/userProfile/TemplatesExplorer";
import TemplatePreview from "@pages/userProfile/TemplatePreview";

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

	{ path: "/changePassword", element: <ChangePassword /> },

	{ path: "/templates", element: <TemplatesExplorer /> },

	{ path: "/templates/:id/preview", element: <TemplatePreview /> },

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
