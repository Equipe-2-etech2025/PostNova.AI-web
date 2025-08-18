import api from "@configs/api";

export const featuresService = {
	async getAllFeatures() {
		try {
			const response = await api.get("/features/");
			return {
				success: true,
				data: response.data,
			};
		} catch (error) {
			return handleError(error, "Impossible de récupérer les fonctionnalités");
		}
	},

	async getFeatureById(id) {
		try {
			const response = await api.get(`/features/${id}`);
			return {
				success: true,
				data: response.data,
			};
		} catch (error) {
			return handleError(error, `Erreur lors de la récupération de la fonctionnalité ID ${id}`);
		}
	},	

	async createFeature(data) {
		try {
			const response = await api.post("/features", data);
			return {
				success: true,
				data: response.data,
				message: "Fonctionnalité créée avec succès",
			};
		} catch (error) {
			return handleError(error, "Erreur lors de la création de la fonctionnalité");
		}
	},

	async updateFeature(id, data) {
		try {
			const response = await api.put(`/features/${id}`, data);
			return {
				success: true,
				data: response.data,
				message: "Fonctionnalité mise à jour avec succès",
			};
		} catch (error) {
			return handleError(error, `Erreur lors de la mise à jour de la fonctionnalité ID ${id}`);
		}
	},		
	async deleteFeature(id) {
		try {
			const response = await api.delete(`/features/${id}`);
			return {
				success: true,
				message: response.data.message || "Fonctionnalité supprimée avec succès",
			};
		} catch (error) {
			return handleError(error, `Erreur lors de la suppression de la fonctionnalité ID ${id}`);
		}
	},	

	async searchByCriteria(criteria = {}) 
	{
		try {
			const query = new URLSearchParams(criteria).toString();
			const response = await api.get(`/features/search?${query}`);
			return {
				success: true,
				data: response.data,
				totals: response.total,
			};
		} catch (error) {
			return handleError(error, "Erreur lors de la recherche de fonctionnalités");
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