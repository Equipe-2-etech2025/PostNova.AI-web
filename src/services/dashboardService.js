import api from "@configs/api";

export const dashboardService = {
	async getIndicators(userId) {
		try {
			const response = await api.get(`/dashboard/indicators/${userId}`);
			return { success: true, data: response.data.data };
		} catch (e) {
			console.error("Erreur fetch dashboard indicators:", e);
			return { success: false, message: e.message };
		}
	}
};