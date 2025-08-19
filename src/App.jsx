import { BrowserRouter, Route, Routes, Navigate } from "react-router";
import routes from "./app/routes";
import { ThemeProvider } from "@contexts/ThemeContext";
import { AuthProvider } from "@contexts/AuthContext";
import ProtectedRoute from "@components/ProtectedRoute";
import PublicRoute from "@components/PublicRoute";

const renderRoutes = (routeList) => {
	return routeList.map((route) => {
		if (route.children) {
			return (
				<Route key={route.path} path={route.path} element={route.element}>
					{route.children.map((childRoute) => (
						<Route
							key={childRoute.path}
							path={childRoute.path}
							element={
								childRoute.authPage ? (
									<PublicRoute
										allowIfEmailNotVerified={childRoute.allowIfEmailNotVerified}
									>
										{childRoute.element}
									</PublicRoute>
								) : childRoute.public ? (
									childRoute.element
								) : childRoute.admin ? (
									<ProtectedRoute requireAdmin={true}>
										{childRoute.element}
									</ProtectedRoute>
								) : (
									<ProtectedRoute>{childRoute.element}</ProtectedRoute>
								)
							}
						/>
					))}
				</Route>
			);
		}

		// Routes de redirection pour compatibilité
		if (route.redirect) {
			return (
				<Route
					key={route.path}
					path={route.path}
					element={<Navigate to={route.redirect} replace />}
				/>
			);
		}

		// Routes simples (page d'erreur, etc.)
		return (
			<Route
				key={route.path}
				path={route.path}
				element={
					route.authPage ? (
						<PublicRoute>{route.element}</PublicRoute>
					) : route.public ? (
						route.element
					) : route.admin ? (
						<ProtectedRoute requireAdmin={true}>{route.element}</ProtectedRoute>
					) : (
						<ProtectedRoute>{route.element}</ProtectedRoute>
					)
				}
			/>
		);
	});
};

const AppRoutes = () => {
	return <Routes>{renderRoutes(routes)}</Routes>;
};

function App() {
	return (
		<ThemeProvider>
			<BrowserRouter>
				<AuthProvider>
					<AppRoutes />
				</AuthProvider>
			</BrowserRouter>
		</ThemeProvider>
	);
}

export default App;
