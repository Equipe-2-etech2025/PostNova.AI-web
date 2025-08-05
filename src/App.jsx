import { BrowserRouter, Route, Routes } from "react-router";
import routes from "./app/routes";
import { ThemeProvider } from "@contexts/ThemeContext";
import { AuthProvider } from "@contexts/AuthContext";
import ProtectedRoute from "@components/ProtectedRoute";

const AppRoutes = () => {
	return (
		<Routes>
			{routes.map((route) => {
				return (
					<Route
						key={route.path}
						path={route.path}
						element={
							route.public ? (
								route.element
							) : (
								<ProtectedRoute>{route.element}</ProtectedRoute>
							)
						}
					/>
				);
			})}
		</Routes>
	);
};

function App() {
	return (
		<ThemeProvider>
			<AuthProvider>
				<BrowserRouter>
					<AppRoutes />
				</BrowserRouter>
			</AuthProvider>
		</ThemeProvider>
	);
}

export default App;
