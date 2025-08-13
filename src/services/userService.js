import api from "@configs/api";

export const userService = {
	async changePassword(data) {
		try {
			const response = await api.post("/users/change-password", data);
			return {
				success: true,
				message: response.data.message || "Mot de passe modifié avec succès",
			};
		} catch (error) {
			console.error("Erreur lors du changement de mot de passe:", error);

			return {
				success: false,
				message:
					error.response?.data?.message || "Erreur lors du changement de mot de passe",
				errors: error.response?.data?.errors || {},
			};
		}
	},

	async updateUser(userId, data) {
		try {
			const response = await api.put(`/users/${userId}`, data);
			return {
				success: true,
				message: response.data.message || "Profil mis à jour avec succès",
				data: response.data,
			};
		} catch (error) {
			console.error("Erreur lors de la mise à jour du profil:", error);

			return {
				success: false,
				message:
					error.response?.data?.message || "Erreur lors de la mise à jour du profil",
				errors: error.response?.data?.errors || {},
			};
		}
	},
};
