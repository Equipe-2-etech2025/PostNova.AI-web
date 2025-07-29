import api from "./api.js";

export const resetPassword = {
	async sendResetPassword(email) {
		try {
			const response = await api.post(
				"auth/forgot-password",
				email
			);
			console.log("Reset link envoyé");
			return {
				success: true,
				message: response.message,
			};
		} catch (error) {
			console.error(
				"Erreur lors de l'envoi du reset link:",
				error
			);

			if (error.code === "ERR_NETWORK") {
				return {
					success: false,
					message: "Impossible de se connecter au serveur.",
					errors: {},
				};
			}

			return {
				success: false,
				message:
					error.response?.data
						?.message ||
					"Erreur d'envoi de l'email.",
				errors:
					error.response?.data
						?.errors || {},
			};
		}
	},
	async reset(credentials) {
		try {
			const response = await api.post(
				"auth/reset-password",
				credentials
			);
			console.log("Mot de passe réinitialisé");
			return {
				success: true,
				message: response.message,
			};
		} catch (error) {
			console.error(
				"Erreur lors de la réinitialisation:",
				error
			);

			if (error.code === "ERR_NETWORK") {
				return {
					success: false,
					message: "Impossible de se connecter au serveur.",
					errors: {},
				};
			}

			return {
				success: false,
				message:
					error.response?.data
						?.message ||
					"Erreur de réinitilaisation.",
				errors:
					error.response?.data
						?.errors || {},
			};
		}
	},
};
