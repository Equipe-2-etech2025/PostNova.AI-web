import React from "react";

import * as Auth from "@pages/auth";
import * as Public from "@pages/public";
import * as Campaign from "@pages/campaign";
import * as Admin from "@pages/admin";
import NotFound from "./pages/404";
import Dashboard from "@pages/Dashboard";

const routes = [
	/**
	 * Routes publiques
	 * Accessibles sans authentification
	 */
	{ path: "/", element: <Public.Home />, public: true },
	{ path: "/terms-of-use", element: <Public.TermsOfUse />, public: true },
	{
		path: "/privacy-policy",
		element: <Public.PrivacyPolicyPage />,
		public: true,
	},

	// Authentification
	{ path: "/login", element: <Auth.Login />, public: true },
	{ path: "/register", element: <Auth.Register />, public: true },

	// Verification email
	{ path: "/email/verify", element: <Public.EmailVerification />, public: true },

	// Réinitialisation mot de passe
	{ path: "/reset-password", element: <Public.ResetPassword />, public: true },

	/**
	 * Routes protégées
	 * Nécessitant une authentification d'utilisateur
	 */
	{ path: "/dashboard", element: <Dashboard /> },
	// Campaign
	{ path: "/campaign/new", element: <Campaign.New /> },
	{ path: "/campaign/:id", element: <Campaign.Detail /> },
	{ path: "/campaign/:id/preview-page", element: <Campaign.PreviewPage /> },

	/**
	 * Routes administratives
	 * Réservées aux administrateurs
	 */
	{ path: "/admin", element: <Admin.Dashboard />, admin: true },

	/**
	 * Pages d'erreur
	 */
	{ path: "*", element: <NotFound /> },
];

export default routes;
