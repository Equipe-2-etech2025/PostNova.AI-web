import React from "react";
import { Navigate } from "react-router-dom";
import useAuth from "@hooks/useAuth";

const ProtectedRoute = ({
	children,
	requireAdmin = false,
	requireEmailVerification = true,
}) => {
	const { user, loading } = useAuth();

	if (loading) {
		return (
			<div className="min-h-screen bg-[#1c1b23] flex items-center justify-center">
				<div className="text-white text-center">
					<svg
						className="animate-spin h-12 w-12 mx-auto mb-4"
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
					>
						<circle
							className="opacity-25"
							cx="12"
							cy="12"
							r="10"
							stroke="currentColor"
							strokeWidth="4"
						></circle>
						<path
							className="opacity-75"
							fill="currentColor"
							d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
						></path>
					</svg>
					<p>Chargement...</p>
				</div>
			</div>
		);
	}

	// Si pas authentifié, rediriger vers login

	// Si email non vérifié et vérification requise, rediriger vers vérification
	if (requireEmailVerification && user && !user.email_verified_at) {
		return <Navigate to="/email/verify" replace />;
	}

	// Si admin requis mais utilisateur pas admin
	if (requireAdmin && user?.role !== "admin") {
		return <Navigate to="/dashboard" replace />;
	}

	return children;
};

export default ProtectedRoute;
