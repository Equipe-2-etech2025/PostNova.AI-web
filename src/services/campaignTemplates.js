import api from "@configs/api";

class CampaignTemplateService {
	async getCampaignTemplates() {
		try {
			const response = await api.get("/campaign-templates");
			return {
				success: true,
				data: response.data,
			};
		} catch (error) {
			console.error(
				"Erreur lors de la récupération des modèles de campagne :",
				error
			);
			return {
				success: false,
				data: [],
				error: error.message || "Erreur inconnue",
			};
		}
	}

	async getCampaignTemplateById(id) {
		try {
			const response = await api.get(`/campaign-templates/find/${id}`);
			return {
				success: true,
				data: response.data,
			};
		} catch (error) {
			console.error(
				`Erreur lors de la récupération du modèle de campagne ${id} :`,
				error
			);
			return {
				success: false,
				data: null,
				error: error.response?.data?.message || error.message || "Erreur inconnue",
			};
		}
	}

	async getCategories() {
		try {
			const response = await api.get("/campaign-templates/categories");
			return {
				success: true,
				data: response.data,
			};
		} catch (error) {
			console.error("Erreur lors de la récupération des catégories :", error);
			return {
				success: false,
				data: [],
				error: error.message || "Erreur inconnue",
			};
		}
	}

	async getTypeCampaigns() {
		try {
			const response = await api.get("/type-campaigns");
			return {
				success: true,
				data: response.data,
			};
		} catch (error) {
			console.error(
				"Erreur lors de la récupération des types de campagne :",
				error
			);
			return {
				success: false,
				data: [],
				error: error.message || "Erreur inconnue",
			};
		}
	}

	async upsertRating(templateId, rating) {
		try {
			const response = await api.post(`/campaign-templates/ratings/${templateId}`, { rating });
			return {
				success: true,
				data: response.data,
			};
		} catch (error) {
			console.error(`Erreur lors de la mise à jour du rating du template ${templateId} :`, error);
			return {
				success: false,
				data: null,
				error: error.response?.data?.message || error.message || "Erreur inconnue",
			};
		}
	}
}

export const campaignTemplateService = new CampaignTemplateService();
