import api from "@configs/api";

/**
 * Régénère et met à jour un post social existant
 * @param {number} postId
 * @param {Object} params
 *  - topic: string (requis)
 *  - platforms: array (requis)
 *  - campaign_id: number (requis)
 *  - tone: string (optionnel)
 *  - language: string (optionnel)
 *  - hashtags: string (optionnel)
 *  - target_audience: string (optionnel)
 *  - is_published: boolean (optionnel)
 */
export const regenerateSocialPostService = async (postId, params) => {
	try {
		const response = await api.put(`/social-posts/regenerate/${postId}`, params);
		return response.data;
	} catch (error) {
		console.error("Failed to regenerate social post:", error);
		return {
			success: false,
			message: error?.response?.data?.message || "Erreur lors de la régénération",
			type: error?.response?.data?.type || "regeneration_error",
			error: error?.response?.data?.error || error.message,
		};
	}
};

/**
 * Prévisualisation de régénération (sans mise à jour en base)
 * @param {Object} params
 */
export const previewRegenerateSocialPostService = async (params) => {
	try {
		const response = await api.post(`/social-posts/regenerate-preview`, params);
		return response.data;
	} catch (error) {
		console.error("Failed to preview regeneration:", error);
		return {
			success: false,
			message:
				error?.response?.data?.message || "Erreur lors de la prévisualisation",
			type: error?.response?.data?.type || "preview_error",
			error: error?.response?.data?.error || error.message,
		};
	}
};
