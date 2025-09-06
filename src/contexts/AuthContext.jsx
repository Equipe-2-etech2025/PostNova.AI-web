import React, {
	createContext,
	useState,
	useEffect,
	useRef,
	useCallback,
} from "react";
import { useNavigate } from "react-router";
import { authService } from "@services/authService";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
	const navigate = useNavigate();
	const [user, setUser] = useState(null);
	const [isAuthenticated, setIsAuthenticated] = useState(null);
	const [loading, setLoading] = useState(true);
	const initialCheckDone = useRef(false);

	const checkAuthStatus = useCallback(async () => {
		try {
			setLoading(true);
			const token = localStorage.getItem("token");
			if (token) {
				console.log("Token trouvé, vérification de l'utilisateur...");
				const userData = await authService.getCurrentUser();

				if (userData) {
					setUser(userData);
					setIsAuthenticated(true);
					console.log("Utilisateur authentifié:", userData);
				} else {
					localStorage.removeItem("token");
					setUser(null);
					setIsAuthenticated(false);
					navigate("/login");
					console.log("Token invalide, utilisateur déconnecté");
				}
			} else {
				console.log("Aucun token trouvé");
				setUser(null);
				setIsAuthenticated(false);
			}
		} catch (error) {
			console.error(
				"Erreur lors de la vérification de l'authentification:",
				error
			);

			// En cas d'erreur 401, c'est normal (pas connecté)
			if (error.response?.status === 401) {
				console.log("Utilisateur non authentifié");
			} else {
				localStorage.removeItem("token");
			}

			setUser(null);
			setIsAuthenticated(false);
		} finally {
			setLoading(false);
		}
	}, [navigate]);

	useEffect(() => {
		if (!initialCheckDone.current) {
			initialCheckDone.current = true;
			const currentPath = window.location.pathname;
			if (!currentPath.includes("/email/verify")) {
				checkAuthStatus();
			}
		}
	}, [checkAuthStatus]);

	const login = async (credentials) => {
		try {
			const response = await authService.login(credentials);

			if (response.success) {
				localStorage.setItem("token", response.token);
				setUser(response.user);
				setIsAuthenticated(true);
				console.log("Connexion réussie dans le contexte");
				return {
					success: true,
					message: response.message,
				};
			} else {
				return {
					success: false,
					message: response.message,
					errors: response.errors,
				};
			}
		} catch (error) {
			console.error("Erreur dans login context:", error);
			return {
				success: false,
				message: "Erreur de connexion",
				errors: {},
			};
		}
	};

	const register = async (userData) => {
		try {
			const response = await authService.register(userData);
			if (response.success) {
				localStorage.setItem("token", response.token);
				setUser(response.user);
				setIsAuthenticated(true);
				return {
					success: true,
					message: response.message,
				};
			} else {
				return {
					success: false,
					message: response.message,
					errors: response.errors,
				};
			}
		} catch (error) {
			console.log(error);
			return {
				success: false,
				message: "Erreur d'inscription",
				errors: {},
			};
		}
	};

	const logout = async () => {
		try {
			await authService.logout();
			setUser(null);
			setIsAuthenticated(false);
			navigate("/login");
		} catch (error) {
			console.error("Erreur lors de la déconnexion:", error);
		} finally {
			localStorage.removeItem("token");
			setUser(null);
			setIsAuthenticated(false);
		}
	};

	const refreshToken = async () => {
		try {
			const response = await authService.refreshToken();
			if (response.success) {
				localStorage.setItem("token", response.token);
				return true;
			}
			return false;
		} catch (error) {
			console.error("Erreur lors du rafraîchissement:", error);
			return false;
		}
	};

	const updateUser = (newUserData) => {
		setUser((prevUser) => ({ ...prevUser, ...newUserData }));
	};

	const value = {
		user,
		isAuthenticated,
		setIsAuthenticated,
		setUser,
		loading,
		login,
		register,
		logout,
		refreshToken,
		checkAuthStatus,
		updateUser,
	};

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export { AuthContext, AuthProvider };
