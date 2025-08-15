import api from "@configs/api";

export const campaignService = {
	async getAllCampaigns() {
		try {
			const response = await api.get("/campaigns/");
			console.log(response.data);
			return {
				success: true,
				data: response.data,
			};
		} catch (error) {
			return handleError(error, "Impossible de récupérer les campagnes");
		}
	},

	async getCampaignById(id) {
		try {
			const response = await api.get(`/campaigns/${id}`);
			return {
				success: true,
				data: response.data,
			};
		} catch (error) {
			return handleError(
				error,
				`Impossible de récupérer la campagne avec l'ID ${id}`
			);
		}
	},

	async createCampaign(campaignData) {
		try {
			const response = await api.post("/campaigns", campaignData);
			return {
				success: true,
				data: response.data,
				message: "Campagne créée avec succès",
			};
		} catch (error) {
			return handleError(error, "Erreur lors de la création de la campagne");
		}
	},

	async getPopularCampaigns() {
		try {
			const response = await api.get("/campaigns/popular/content");
			return {
				success: true,
				data: response.data.data,
				totals: response.data.totals,
			};
		} catch (error) {
			return handleError(
				error,
				"Impossible de récupérer les campagnes populaires"
			);
		}
	},

	async updateCampaign(id, campaignData) {
		try {
			const response = await api.put(`/campaigns/${id}`, campaignData);
			return {
				success: true,
				data: response.data,
				message: "Campagne mise à jour avec succès",
			};
		} catch (error) {
			return handleError(
				error,
				`Erreur lors de la mise à jour de la campagne ID ${id}`
			);
		}
	},

	async deleteCampaign(id) {
		try {
			const response = await api.delete(`/campaigns/${id}`);
			return {
				success: true,
				message: response.data.message || "Campagne supprimée avec succès",
			};
		} catch (error) {
			return handleError(
				error,
				`Erreur lors de la suppression de la campagne ID ${id}`
			);
		}
	},

	async getCampaignsByUserId(userId) {
		try {
			const response = await api.get(`/campaigns/user/${userId}`);
			return {
				success: true,
				data: response.data,
			};
		} catch (error) {
			return handleError(
				error,
				`Erreur lors de la récupération des campagnes de l'utilisateur ID ${userId}`
			);
		}
	},

	async getCampaignsByCriteria(criteria = {}) {
		try {
			const queryString = new URLSearchParams(criteria).toString();
			const response = await api.get(`/campaigns/criteria?${queryString}`);
			return {
				success: true,
				data: response.data,
			};
		} catch (error) {
			return handleError(error, "Erreur lors de la récupération par critères");
		}
	},

	generateNameAndCreate: (data) =>
    api.post("/campaigns/generate-name", data).then(res => res.data),

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
