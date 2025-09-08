import React from "react";
import { Navigate } from "react-router";
import useAuth from "@hooks/useAuth";

const ProtectedRoute = ({
	children,
	requireAdmin = false,
	requireEmailVerification = true,
}) => {
	const { user } = useAuth();

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
