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
}

export const campaignTemplateService = new CampaignTemplateService();
