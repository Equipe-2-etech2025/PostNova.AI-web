import api from "./api.js";

export const emailVerificationService = {
	// Renvoyer l'email de vérification
	async resendVerificationEmail() {
		const token = localStorage.getItem("token");

		const response = await fetch(
			`${API_BASE_URL}/email/verification-notification`,
			{
				method: "POST",
				headers: {
					"Content-Type":
						"application/json",
					Authorization: `Bearer ${token}`,
					Accept: "application/json",
				},
			}
		);

		if (!response.ok) {
			const errorData = await response.json();
			throw new Error(
				errorData.message ||
					"Erreur lors de l'envoi"
			);
		}

		return await response.json();
	},

	// Vérifier l'email avec les paramètres de l'URL
	async verifyEmail(verificationData) {
		const token = localStorage.getItem("token");

		const response = await fetch(
			`${API_BASE_URL}/email/verify`,
			{
				method: "POST",
				headers: {
					"Content-Type":
						"application/json",
					Authorization: `Bearer ${token}`,
					Accept: "application/json",
				},
				body: JSON.stringify(verificationData),
			}
		);

		if (!response.ok) {
			const errorData = await response.json();
			throw new Error(
				errorData.message ||
					"Erreur lors de la vérification"
			);
		}

		return await response.json();
	},

	// Vérifier le statut de vérification
	async checkVerificationStatus() {
		const token = localStorage.getItem("token");

		const response = await fetch(`${API_BASE_URL}/user`, {
			method: "GET",
			headers: {
				Authorization: `Bearer ${token}`,
				Accept: "application/json",
			},
		});

		if (!response.ok) {
			throw new Error(
				"Erreur lors de la vérification du statut"
			);
		}

		const userData = await response.json();
		return userData.email_verified_at !== null;
	},
};
