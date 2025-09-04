import api from "@configs/api";

export const socialPostService = {
	async getAllSocialPost() {
		try {
			const response = await api.get("/social-posts/");
			return {
				success: true,
				data: response.data,
			};
		} catch (error) {
			return {
				success: false,
				message: "Impossible de récupérer les posts sociaux",
				errors: error.response?.data?.errors || {},
			};
		}
	},
	async getSocialPostById(id) {
		try {
			const response = await api.get(`/social-posts/${id}`);
			return {
				success: true,
				data: response.data,
			};
		} catch (error) {
			return {
				success: false,
				message: `Impossible de récupérer le post social avec l'ID ${id}`,
				errors: error.response?.data?.errors || {},
			};
		}
	},	

	async createSocialPost(postData) {
		try {
			const response = await api.post("/social-posts", postData);
			return {
				success: true,
				data: response.data,
				message: "Post social créé avec succès",
			};
		} catch (error) {
			return {
				success: false,
				message: "Erreur lors de la création du post social",
				errors: error.response?.data?.errors || {},
			};
		}
	},	
	async updateSocialPost(id, postData) {
		try {
			const response = await api.put(`/social-posts/${id}`, postData);
			return {
				success: true,
				data: response.data,
				message: "Post social mis à jour avec succès",
			};
		} catch (error) {
			return {
				success: false,
				message: "Erreur lors de la mise à jour du post social",
				errors: error.response?.data?.errors || {},
			};
		}
	},

	async deleteSocialPost(id) {
		try {	
			const response = await api.delete(`/social-posts/${id}`);
			return {
				success: true,
				data: response.data,
				message: "Post social supprimé avec succès",
			};
		} catch (error) {
			return {
				success: false,
				message: "Erreur lors de la suppression du post social",
				errors: error.response?.data?.errors || {},
			};
		}
	}
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

