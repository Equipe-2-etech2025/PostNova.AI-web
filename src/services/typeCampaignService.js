import api from "@configs/api";

export const TypeCampaignService = {
	async getAllTypeCampaign() {
		try {
			const response = await api.get("/type-campaigns/");
			return {
				success: true,
				data: response.data,
			};
		} catch (error) {
			return {
				success: false,
				message: error.response?.data?.message || "Erreur lors de la récupération des types de campagne",
				errors: error.response?.data?.errors || {},
			};
		}
	},	

	async getTypeCampaignById(id) {
		try {	
			const response = await api.get(`/type-campaigns/${id}`);
			return {
				success: true,
				data: response.data,
			};
		} catch (error) {
			return {
				success: false,
				message: error.response?.data?.message || `Erreur lors de la récupération du type de campagne ID ${id}`,
				errors: error.response?.data?.errors || {},
			};
		}
	},

	async createTypeCampaign(data) {
		try {
			const response = await api.post("/type-campaigns", data);
			return {
				success: true,
				data: response.data,
				message: "Type de campagne créé avec succès",
			};
		} catch (error) {
			return {
				success: false,
				message: error.response?.data?.message || "Erreur lors de la création du type de campagne",
				errors: error.response?.data?.errors || {},
			};
		}
	},		

	async updateTypeCampaign(id, data) {
		try {		
			const response = await api.put(`/type-campaigns/${id}`, data);
			return {
				success: true,
				data: response.data,
				message: "Type de campagne mis à jour avec succès",
			};
		} catch (error) {
			return {
				success: false,
				message: error.response?.data?.message || `Erreur lors de la mise à jour du type de campagne ID ${id}`,
				errors: error.response?.data?.errors || {},
			};
		}
	},

	async deleteTypeCampaign(id) {
		try {
			const response = await api.delete(`/type-campaigns/${id}`);
			return {
				success: true,
				message: response.data.message || "Type de campagne supprimé avec succès",
			};
		} catch (error) {
			return {
				success: false,
				message: error.response?.data?.message || `Erreur lors de la suppression du type de campagne ID ${id}`,
				errors: error.response?.data?.errors || {},
			};
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

