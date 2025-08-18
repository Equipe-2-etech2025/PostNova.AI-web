import React from "react";
import { Navigate } from "react-router";
import useAuth from "@hooks/useAuth";

const ProtectedRoute = ({
	children,
	requireAdmin = false,
	requireEmailVerification = true,
}) => {
	const { user, loading } = useAuth();

	if (loading) {
		return (
			<div className="min-h-screen flex items-center justify-center">
				<div className="space-y-3 animate-pulse">
					<div className="w-12 h-12 border-6 border-gray-500 border-y-gray-500/10 rounded-full mx-auto animate-spin"></div>
					<p className="animate-bounce">Chargement...</p>
				</div>
			</div>
		);
	}

	// if no user is authenticated, redirect to login
	if (!user) {
		return <Navigate to="/login" replace />;
	}

	// Si email non vérifié et vérification requise, rediriger vers vérification
	if (requireEmailVerification && user && !user.email_verified_at) {
		return <Navigate to="/email/verify" replace />;
	}

	// Si admin requis mais utilisateur pas admin
	if (requireAdmin && user?.role !== "admin") {
		return <Navigate to="/dashboard" />;
	}

	return children;
};

export default ProtectedRoute;
