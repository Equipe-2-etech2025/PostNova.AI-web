import { BrowserRouter, Route, Routes } from "react-router";
import routes from "./app/routes";
import ProtectedRoute from "@components/ProtectedRoute";
import { AuthProvider } from "@contexts/AuthContext";

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
		<AuthProvider>
			<BrowserRouter>
				<AppRoutes />
			</BrowserRouter>
		</AuthProvider>
	);
}

export default App;
