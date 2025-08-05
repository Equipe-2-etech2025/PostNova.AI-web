import api from "@configs/api";

export const tarifUserService = {
	async getAll() {
		try {
			const response = await api.get("/tarif-users/");
			return {
				success: true,
				data: response.data,
			};
		} catch (error) {
			return handleError(error, "Impossible de récupérer les tarifs utilisateurs");
		}
	},

	async getById(id) {
		try {
			const response = await api.get(`/tarif-users/${id}`);
			return {
				success: true,
				data: response.data,
			};
		} catch (error) {
			return handleError(
				error,
				`Erreur lors de la récupération du tarif utilisateur ID ${id}`
			);
		}
	},

	async create(data) {
		try {
			const response = await api.post("/tarif-users", data);
			return {
				success: true,
				data: response.data,
				message: "Tarif utilisateur créé avec succès",
			};
		} catch (error) {
			return handleError(error, "Erreur lors de la création du tarif utilisateur");
		}
	},

	async update(id, data) {
		try {
			const response = await api.put(`/tarif-users/${id}`, data);
			return {
				success: true,
				data: response.data,
				message: "Tarif utilisateur mis à jour avec succès",
			};
		} catch (error) {
			return handleError(
				error,
				`Erreur lors de la mise à jour du tarif utilisateur ID ${id}`
			);
		}
	},

	async delete(id) {
		try {
			const response = await api.delete(`/tarif-users/${id}`);
			return {
				success: true,
				message: response.data.message || "Tarif utilisateur supprimé avec succès",
			};
		} catch (error) {
			return handleError(
				error,
				`Erreur lors de la suppression du tarif utilisateur ID ${id}`
			);
		}
	},

	async getLatestByUserId(userId) {
		try {
			const response = await api.get(`/tarif-users/users/${userId}/latest-tarif`);
			return {
				success: true,
				data: response.data,
			};
		} catch (error) {
			return handleError(
				error,
				`Erreur lors de la récupération du tarif utilisateur le plus récent pour l'utilisateur ID ${userId}`
			);
		}
	},

	async searchByCriteria(criteria = {}) {
		try {
			const query = new URLSearchParams(criteria).toString();
			const response = await api.get(`/tarif-users/search?${query}`);
			return {
				success: true,
				data: response.data,
			};
		} catch (error) {
			return handleError(error, "Erreur lors de la recherche par critères");
		}
	},
};

function handleError(error, defaultMsg) {
	console.error(defaultMsg, error);

	if (error.code === "ERR_NETWORK") {
		return {
			success: false,
			message: "Impossible de se connecter au serveur.",
			errors: {},
		};
	}

	return {
		success: false,
		message: error.response?.data?.message || defaultMsg,
		errors: error.response?.data?.errors || {},
	};
}
