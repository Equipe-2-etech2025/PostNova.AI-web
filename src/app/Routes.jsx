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
import Dashboard from "./pages/DashboardUser";
import EmailVerification from "./pages/EmailVerification";
import PasswordResetFlow from "./pages/ResetPassword";
import PolitiqueConfidentialite from "./pages/politiqueConfidentialite";
import ConditionsUtilisation from "./pages/conditionsUtilisation";

const Routes = () => {
	return (
		<AuthProvider>
			<BrowserRouter>
				<Router>
					{/* Routes publiques */}
					<Route
						path="/"
						element={<Home />}
					/>
					<Route
						path="/login"
						element={<Login />}
					/>
					<Route
						path="/register"
						element={
							<Register />
						}
					/>
					<Route
						path="/resetPassword"
						element={
							<PasswordResetFlow />
						}
					/>
					<Route
						path="/conditions-utilisation"
						element={
							<ConditionsUtilisation />
						}
					/>
					<Route
						path="/politique-confidentialite"
						element={
							<PolitiqueConfidentialite />
						}
					/>

					{/* Route de vérification email - authentifiée mais sans vérification email requise */}
					<Route
						path="/email/verify"
						element={
							<ProtectedRoute
								requireEmailVerification={
									false
								}
							>
								<EmailVerification />
							</ProtectedRoute>
						}
					/>

					{/* Routes protégées avec vérification email requise */}
					<Route
						path="/dashboard"
						element={
							<ProtectedRoute
								requireEmailVerification={
									true
								}
							>
								<Dashboard />
							</ProtectedRoute>
						}
					/>

					{/* Redirection par défaut pour les utilisateurs connectés */}
					<Route
						path="/home"
						element={
							<Navigate
								to="/dashboard"
								replace
							/>
						}
					/>
				</Router>
			</BrowserRouter>
		</AuthProvider>
	);
};

export default Routes;
