import api from "@configs/api";

class SuggestionService {
	async getSuggestions(userId) {
		try {
			const response = await api.get(`/suggestion/${userId}`);
			return {
				success: true,
				data: response.data,
			};
		} catch (error) {
			console.error("Erreur lors de la récupération des suggestions:", error);
		}
	}

	handleSuggestionAction(suggestionId) {
		const actions = {
			improve_engagement: () => (window.location.href = "/engagement-tips"),
			create_campaign: () => (window.location.href = "/campaigns/create"),
			upgrade_plan: () => (window.location.href = "/pricing"),
			explore_features: () => (window.location.href = "/features"),
		};

		const action = actions[suggestionId];
		if (action) action();
	}
}

export const suggestionService = new SuggestionService();
