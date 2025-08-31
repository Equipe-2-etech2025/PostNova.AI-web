import React from "react";

import MainLayout from "@layouts/MainLayout";
import BlankLayout from "@layouts/BlankLayout";
import NotFound from "./pages/404";
import * as Auth from "@pages/auth";
import * as Public from "@pages/public";
import * as Campaign from "@pages/campaign";
import * as Admin from "@pages/admin";
import Dashboard from "@pages/Dashboard";
import UserProfile from "@pages/userProfile/UserProfile";
import ChangePassword from "@pages/userProfile/ChangePassword";
import TemplatesExplorer from "@pages/userProfile/TemplatesExplorer";
import TemplatePreview from "@pages/userProfile/TemplatePreview";
import CampaignsListPage from "@pages/campaign/CampaignsListPage";
import AllCampaigns from "@pages/campaign/AllCampaigns";
import PaymentForm from "@pages/payment/paymentForm";
// import About from "@pages/public/About";
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
			// { path: "/about", element: <About />, public: true },

			// Private routes
			{ path: "/dashboard", element: <Dashboard /> },
			{ path: "/campaign/new", element: <Campaign.New /> },
			{ path: "/campaign/:id", element: <Campaign.Detail /> },
			{ path: "/campaign/:id/preview-page", element: <Campaign.PreviewPage /> },

			{ path: "/userProfile", element: <UserProfile /> },

			{ path: "/changePassword", element: <ChangePassword /> },

			{ path: "/templates", element: <TemplatesExplorer /> },

			{ path: "/explore", element: <CampaignsListPage /> },

			{ path: "/templates/:id/preview", element: <TemplatePreview /> },

			{ path: "/userProfile", element: <UserProfile /> },

			{ path: "/changePassword", element: <ChangePassword /> },

			{ path: "/templates", element: <TemplatesExplorer /> },

			{ path: "/templates/:id/preview", element: <TemplatePreview /> },

			{ path: "/campaign/list", element: <AllCampaigns /> },

			// Admin routes
			{ path: "/admin", element: <Admin.Dashboard />, admin: true },
		],
	},

	// Payment
	{ path: "/payment", element: <PaymentForm /> },

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
