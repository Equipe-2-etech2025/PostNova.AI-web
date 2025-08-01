import api from "@configs/api";

export const promptService = {
	async getAll() {
		try {
			const response = await api.get("/prompts/");
			return {
				success: true,
				data: response.data,
			};
		} catch (error) {
			return handleError(error, "Impossible de récupérer les prompts");
		}
	},

	async getById(id) {
		try {
			const response = await api.get(`/prompts/${id}`);
			return {
				success: true,
				data: response.data,
			};
		} catch (error) {
			return handleError(error, `Erreur lors de la récupération du prompt ID ${id}`);
		}
	},

	async create(data) {
		try {
			const response = await api.post("/prompts", data);
			return {
				success: true,
				data: response.data,
				message: "Prompt créé avec succès",
			};
		} catch (error) {
			return handleError(error, "Erreur lors de la création du prompt");
		}
	},

	async update(id, data) {
		try {
			const response = await api.put(`/prompts/${id}`, data);
			return {
				success: true,
				data: response.data,
				message: "Prompt mis à jour avec succès",
			};
		} catch (error) {
			return handleError(error, `Erreur lors de la mise à jour du prompt ID ${id}`);
		}
	},

	async delete(id) {
		try {
			const response = await api.delete(`/prompts/${id}`);
			return {
				success: true,
				message: response.data.message || "Prompt supprimé avec succès",
			};
		} catch (error) {
			return handleError(error, `Erreur lors de la suppression du prompt ID ${id}`);
		}
	},

	async searchByCriteria(criteria = {}) {
		try {
			const query = new URLSearchParams(criteria).toString();
			const response = await api.get(`/prompts/search?${query}`);
			return {
				success: true,
				data: response.data,
			};
		} catch (error) {
			return handleError(error, "Erreur lors de la recherche de prompts");
		}
	},

	async getQuotaByUserId(userId) {
		try {
			const response = await api.get(`/prompts/quota/user/${userId}`);
			return {
				success: true,
				data: response.data,
			};
		} catch (error) {
			return handleError(error, `Erreur lors de la récupération du quota pour l'utilisateur ID ${userId}`);
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
