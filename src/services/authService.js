import api from "@configs/api";

export const authService = {
	async login(credentials) {
		try {
			const response = await api.post("/auth/login", credentials);
			localStorage.setItem("auth_token", response.data.data.token);
			return {
				success: true,
				token: response.data.data.token,
				user: response.data.data.user,
				message: response.data.message || "Connexion réussie",
			};
		} catch (error) {
			console.error("Erreur de connexion:", error);

			if (error.code === "ERR_NETWORK") {
				return {
					success: false,
					message:
						"Impossible de se connecter au serveur. Vérifiez que l'API est démarrée.",
					errors: {},
				};
			}

			return {
				success: false,
				message: error.response?.data?.message || "Erreur de connexion",
				errors: error.response?.data?.errors || {},
			};
		}
	},

	async register(userData) {
		try {
			console.log("Tentative d'inscription avec:", userData.email);
			const response = await api.post("/auth/register", userData);

			return {
				success: true,
				token: response.data.data.token,
				user: response.data.data.user,
				message: response.data.message || "Inscription réussie",
				requiresEmailVerification: true,
			};
		} catch (error) {
			console.error("Erreur d'inscription:", error);

			if (error.code === "ERR_NETWORK") {
				return {
					success: false,
					message:
						"Impossible de se connecter au serveur. Vérifiez que l'API est démarrée.",
					errors: {},
				};
			}

			return {
				success: false,
				message: error.response?.data?.message || "Erreur d'inscription",
				errors: error.response?.data?.errors || {},
			};
		}
	},

	async logout() {
		try {
			const response = await api.post("/auth/logout");
			return {
				success: true,
				message: response.data.message || "Déconnexion réussie",
			};
		} catch (error) {
			console.error("Erreur lors de la déconnexion:", error);
			return {
				success: false,
				message: "Erreur lors de la déconnexion",
			};
		}
	},

	async getCurrentUser() {
		try {
			const response = await api.get("/auth/me");
			return response.data.data;
		} catch (error) {
			console.error("Erreur lors de la récupération de l'utilisateur:", error);

			if (error.response?.status === 401) {
				console.log("Utilisateur non authentifié (401)");
				return null;
			}

			if (error.code === "ERR_NETWORK") {
				console.warn("Serveur non disponible, utilisateur non connecté");
				return null;
			}

			throw error;
		}
	},

	async refreshToken() {
		try {
			const response = await api.post("/auth/refresh");
			return {
				success: true,
				token: response.data.data.token,
				message: response.data.message,
			};
		} catch (error) {
			console.error("Erreur lors du rafraîchissement du token:", error);
			return {
				success: false,
				message: "Erreur lors du rafraîchissement du token",
			};
		}
	},
};
