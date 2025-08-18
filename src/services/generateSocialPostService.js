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
export const generateSocialPostService = async (params) => {
  try {
    const response = await api.post(`/social-posts/generate`, params);
    return response.data;
  } catch (error) {
    console.error("Failed to generate social posts:", error);
    return {
      success: false,
      message: error?.response?.data?.message || "Erreur réseau",
      error: error?.response?.data?.error || error.message,
      posts: [],
      count: 0
    };
  }
};
