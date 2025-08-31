import api from "@configs/api";

/**
 * Génère des posts sociaux pour une campagne
 * @param {Object} params
 *  - topic: string
 *  - platforms: array
 *  - campaign_id: number
 *  - tone: string (optionnel)
 *  - language: string (optionnel)
 *  - hashtags: string (optionnel)
 *  - target_audience: string (optionnel)
 *  - is_published: boolean (optionnel)
 */
export const generateSocialPostService = async (data) => {
  try {
    const response = await api.post('/social-posts/generate', data);
    return response.data;
  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.message || "Erreur lors de la génération des posts",
      type: error.response?.data?.type || "api_error",
      error: error.response?.data || error.message
    };
  }
};
