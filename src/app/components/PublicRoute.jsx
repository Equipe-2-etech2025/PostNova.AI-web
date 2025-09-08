import React from "react";
import { Navigate } from "react-router";
import useAuth from "@hooks/useAuth";

/**
 * PublicRoute - Pour les pages d'authentification
 * Redirige les utilisateurs déjà connectés vers le dashboard
 */
const PublicRoute = ({
	children,
	redirectTo = "/dashboard",
	allowIfEmailNotVerified = false,
}) => {
	const { user, loading } = useAuth();

	// // Verification
	// if (loading) {
	// 	return (
	// 		<div className="min-h-screen flex items-center justify-center">
	// 			<div className="space-y-3 animate-pulse">
	// 				<div className="w-12 h-12 border-6 border-purple-500 border-y-purple-500/10 rounded-full mx-auto animate-spin"></div>
	// 				<p className="text-gray-600 dark:text-gray-400 animate-bounce">
	// 					Vérification...
	// 				</p>
	// 			</div>
	// 		</div>
	// 	);
	// }

	// When user is authenticated
	if (user) {
		if (allowIfEmailNotVerified && !user.email_verified_at) {
			return children;
		}

		if (user.email_verified_at) {
			// Redirecting to dashboard if role is admin
			const destination = user.role === "admin" ? "/admin" : redirectTo;
			return <Navigate to={destination} replace />;
		}

		if (!allowIfEmailNotVerified && !user.email_verified_at) {
			return <Navigate to="/email/verify" replace />;
		}
	}

	return children;
};

export default PublicRoute;
