import React from "react";

import MainLayout from "@layouts/MainLayout";
import BlankLayout from "@layouts/BlankLayout";
import NotFound from "./pages/404";
import * as Auth from "@pages/auth";
import * as Public from "@pages/public";
import * as Campaign from "@pages/campaign";
import * as Admin from "@pages/admin";
import Dashboard from "@pages/Dashboard";

const routes = [
	/**
	 * Main routes
	 */
	{
		path: "/",
		element: <MainLayout />,
		children: [
			// Public routes
			{ path: "/", element: <Public.Home />, public: true },
			{ path: "/terms-of-use", element: <Public.TermsOfUse />, public: true },
			{
				path: "/privacy-policy",
				element: <Public.PrivacyPolicyPage />,
				public: true,
			},

			// Private routes
			{ path: "/dashboard", element: <Dashboard /> },
			{ path: "/campaign/new", element: <Campaign.New /> },
			{ path: "/campaign/:id", element: <Campaign.Detail /> },
			{ path: "/campaign/:id/preview-page", element: <Campaign.PreviewPage /> },

			// Admin routes
			{ path: "/admin", element: <Admin.Dashboard />, admin: true },
		],
	},

	/**
	 * Authentication and verification
	 */
	{
		path: "/",
		element: <BlankLayout />,
		children: [
			{ path: "/login", element: <Auth.Login />, authPage: true },
			{ path: "/register", element: <Auth.Register />, authPage: true },
			{
				path: "/email/verify",
				element: <Public.EmailVerification />,
				authPage: true,
				allowIfEmailNotVerified: true,
			},
			{
				path: "/reset-password",
				element: <Public.ResetPassword />,
				authPage: true,
			},
		],
	},

	/**
	 * Error pages
	 */
	{
		element: <BlankLayout />,
		children: [{ path: "*", element: <NotFound />, public: true }],
	},
];

export default routes;
