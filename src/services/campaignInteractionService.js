import api from "@configs/api";

export const campaignInteractionService = {
	async getAllInteractions() {
		try {
			const response = await api.get("/campaign-interactions/");
			return {
				success: true,
				data: response.data,
			};
		} catch (error) {
			return handleError(error, "Impossible de récupérer les interactions");
		}
	},

	async getInteractionById(id) {
		try {
			const response = await api.get(`/campaign-interactions/${id}`);
			return {
				success: true,
				data: response.data,
			};
		} catch (error) {
			return handleError(
				error,
				`Impossible de récupérer l'interaction avec l'ID ${id}`
			);
		}
	},

	async createInteraction(interactionData) {
		try {
			const response = await api.post("/campaign-interactions", interactionData);
			return {
				success: true,
				data: response.data,
				message: "Interaction créée avec succès",
			};
		} catch (error) {
			return handleError(error, "Erreur lors de la création de l'interaction");
		}
	},

	async updateInteraction(id, interactionData) {
		try {
			const response = await api.put(
				`/campaign-interactions/${id}`,
				interactionData
			);
			return {
				success: true,
				data: response.data,
				message: "Interaction mise à jour avec succès",
			};
		} catch (error) {
			return handleError(
				error,
				`Erreur lors de la mise à jour de l'interaction ID ${id}`
			);
		}
	},

	async deleteInteraction(id) {
		try {
			const response = await api.delete(`/campaign-interactions/${id}`);
			return {
				success: true,
				message: response.data.message || "Interaction supprimée avec succès",
			};
		} catch (error) {
			return handleError(
				error,
				`Erreur lors de la suppression de l'interaction ID ${id}`
			);
		}
	},

	async getInteractionsByCampaignId(campaignId) {
		try {
			const response = await api.get(
				`/campaign-interactions/campaign/${campaignId}`
			);
			return {
				success: true,
				data: response.data,
			};
		} catch (error) {
			return handleError(
				error,
				`Erreur lors de la récupération des interactions pour la campagne ID ${campaignId}`
			);
		}
	},

	async getCampaignStats(campaignId) {
		try {
			const response = await api.get(
				`/campaign-interactions/campaign/${campaignId}/stats`
			);
			return {
				success: true,
				data: response.data,
			};
		} catch (error) {
			return handleError(
				error,
				`Erreur lors de la récupération des statistiques pour la campagne ID ${campaignId}`
			);
		}
	},

	async addLike(interactionId) {
		try {
			const response = await api.post(
				`/campaign-interactions/${interactionId}/like`
			);
			return {
				success: true,
				data: response.data,
				message: "Like ajouté avec succès",
			};
		} catch (error) {
			return handleError(
				error,
				`Erreur lors de l'ajout du like à l'interaction ID ${interactionId}`
			);
		}
	},

	async getInteractionsByCriteria(criteria = {}) {
		try {
			const queryString = new URLSearchParams(criteria).toString();
			const response = await api.get(
				`/campaign-interactions/criteria?${queryString}`
			);
			return {
				success: true,
				data: response.data,
			};
		} catch (error) {
			return handleError(error, "Erreur lors de la récupération par critères");
		}
	},

	async dislike(campaignId, userId) {
		try {
			const response = await api.post("/campaign-interactions/dislike", {
				campaign_id: campaignId,
				user_id: userId,
			});
			return {
				success: true,
				data: response.data,
				message: "Dislike ajouté avec succès",
			};
		} catch (error) {
			return handleError(
				error,
				`Erreur lors de l'ajout du dislike pour la campagne ID ${campaignId}`
			);
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
