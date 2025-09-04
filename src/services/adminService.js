import api from "@configs/api";

export const adminService = {
	// Statistiques générales de l'application
	async getSystemStats() {
		try {
			const response = await api.get("/admin/stats/system");
			return { success: true, data: response.data.data };
		} catch (e) {
			console.error("Erreur fetch system stats:", e);
			return { success: false, message: e.message };
		}
	},

	// Statistiques des utilisateurs
	async getUserStats() {
		try {
			const response = await api.get("/admin/stats/users");
			return { success: true, data: response.data.data };
		} catch (e) {
			console.error("Erreur fetch user stats:", e);
			return { success: false, message: e.message };
		}
	},

	// Statistiques des campagnes
	async getCampaignStats() {
		try {
			const response = await api.get("/admin/stats/campaigns");
			return { success: true, data: response.data.data };
		} catch (e) {
			console.error("Erreur fetch campaign stats:", e);
			return { success: false, message: e.message };
		}
	},

	// Statistiques des revenus
	async getRevenueStats() {
		try {
			const response = await api.get("/admin/stats/revenue");
			return { success: true, data: response.data.data };
		} catch (e) {
			console.error("Erreur fetch revenue stats:", e);
			return { success: false, message: e.message };
		}
	},

	// Gestion des utilisateurs
	async getAllUsers(params = {}) {
		try {
			const queryString = new URLSearchParams(params).toString();
			const response = await api.get(
				`/admin/users${queryString ? `?${queryString}` : ""}`
			);
			return { success: true, data: response.data.data };
		} catch (e) {
			console.error("Erreur fetch all users:", e);
			return { success: false, message: e.message };
		}
	},

	async getUserById(id) {
		try {
			const response = await api.get(`/admin/users/${id}`);
			return { success: true, data: response.data.data };
		} catch (e) {
			console.error("Erreur fetch user by id:", e);
			return { success: false, message: e.message };
		}
	},

	async updateUser(id, userData) {
		try {
			const response = await api.put(`/admin/users/${id}`, userData);
			return { success: true, data: response.data.data };
		} catch (e) {
			console.error("Erreur update user:", e);
			return { success: false, message: e.message };
		}
	},

	async deleteUser(id) {
		try {
			const response = await api.delete(`/admin/users/${id}`);
			return { success: true, data: response.data.data };
		} catch (e) {
			console.error("Erreur delete user:", e);
			return { success: false, message: e.message };
		}
	},

	// Gestion des campagnes (admin)
	async getAllCampaignsAdmin(params = {}) {
		try {
			const queryString = new URLSearchParams(params).toString();
			const response = await api.get(
				`/admin/campaigns${queryString ? `?${queryString}` : ""}`
			);
			return { success: true, data: response.data.data };
		} catch (e) {
			console.error("Erreur fetch all campaigns admin:", e);
			return { success: false, message: e.message };
		}
	},

	async updateCampaignStatus(id, status) {
		try {
			const response = await api.put(`/admin/campaigns/${id}/status`, { status });
			return { success: true, data: response.data.data };
		} catch (e) {
			console.error("Erreur update campaign status:", e);
			return { success: false, message: e.message };
		}
	},

	async deleteCampaign(id) {
		try {
			const response = await api.delete(`/admin/campaigns/${id}`);
			return { success: true, data: response.data.data };
		} catch (e) {
			console.error("Erreur delete campaign:", e);
			return { success: false, message: e.message };
		}
	},

	// Gestion des tarifs
	async getAllTarifs() {
		try {
			const response = await api.get("/admin/tarifs");
			return { success: true, data: response.data.data };
		} catch (e) {
			console.error("Erreur fetch all tarifs:", e);
			return { success: false, message: e.message };
		}
	},

	async createTarif(tarifData) {
		try {
			const response = await api.post("/admin/tarifs", tarifData);
			return { success: true, data: response.data.data };
		} catch (e) {
			console.error("Erreur create tarif:", e);
			return { success: false, message: e.message };
		}
	},

	async updateTarif(id, tarifData) {
		try {
			const response = await api.put(`/admin/tarifs/${id}`, tarifData);
			return { success: true, data: response.data.data };
		} catch (e) {
			console.error("Erreur update tarif:", e);
			return { success: false, message: e.message };
		}
	},

	async deleteTarif(id) {
		try {
			const response = await api.delete(`/admin/tarifs/${id}`);
			return { success: true, data: response.data.data };
		} catch (e) {
			console.error("Erreur delete tarif:", e);
			return { success: false, message: e.message };
		}
	},

	// Logs système
	async getSystemLogs(params = {}) {
		try {
			const queryString = new URLSearchParams(params).toString();
			const response = await api.get(
				`/admin/logs${queryString ? `?${queryString}` : ""}`
			);
			return { success: true, data: response.data.data };
		} catch (e) {
			console.error("Erreur fetch system logs:", e);
			return { success: false, message: e.message };
		}
	},

	// Notifications système
	async sendSystemNotification(notificationData) {
		try {
			const response = await api.post("/admin/notifications", notificationData);
			return { success: true, data: response.data.data };
		} catch (e) {
			console.error("Erreur send notification:", e);
			return { success: false, message: e.message };
		}
	},

	// Sauvegarde et export
	async exportData(type) {
		try {
			const response = await api.get(`/admin/export/${type}`, {
				responseType: "blob",
			});
			return { success: true, data: response.data };
		} catch (e) {
			console.error("Erreur export data:", e);
			return { success: false, message: e.message };
		}
	},

	// Configuration système
	async getSystemConfig() {
		try {
			const response = await api.get("/admin/config");
			return { success: true, data: response.data.data };
		} catch (e) {
			console.error("Erreur fetch system config:", e);
			return { success: false, message: e.message };
		}
	},

	async updateSystemConfig(configData) {
		try {
			const response = await api.put("/admin/config", configData);
			return { success: true, data: response.data.data };
		} catch (e) {
			console.error("Erreur update system config:", e);
			return { success: false, message: e.message };
		}
	},
};

function handleError(error, defaultMsg) {
	if (error.response) {
		// Erreur de réponse HTTP
		return error.response.data?.message || defaultMsg;
	} else if (error.request) {
		// Erreur de réseau
		return "Erreur de connexion au serveur";
	} else {
		// Autre erreur
		return error.message || defaultMsg;
	}
}
