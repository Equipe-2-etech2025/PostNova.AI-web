import api from "@configs/api";

export const generate = async (params) => {
	try {
		const response = await api.post(`/landing-pages/generate`, params);
		return response.data;
	} catch (error) {
		console.error("Failed to generate landing page:", error);
		return {
			success: false,
			message: error?.response?.data?.message || "Erreur réseau",
			error: error?.response?.data?.error || error.message,
		};
	}
};

export const getAllLandingPage = async (params) => {
	try {
		const response = await api.get(`/landing-pages`, { params });
		return response.data;
	} catch (error) {
		console.error("Failed to fetch landing pages:", error);
		return {
			success: false,
			message: error?.response?.data?.message || "Erreur réseau",
			error: error?.response?.data?.error || error.message,
		};
	}
};

export const updateLandingPage = async (id, params) => {
	try {
		const response = await api.put(`/landing-pages/${id}`, params);
		return response.data;
	} catch (error) {
		console.error("Failed to update landing page:", error);
		return {
			success: false,
			message: error?.response?.data?.message || "Erreur réseau",
			error: error?.response?.data?.error || error.message,
		};
	}
};

export const deleteLandingPage = async (id) => {
	try {
		const response = await api.delete(`/landing-pages/${id}`);
		return response.data;
	} catch (error) {
		console.error("Failed to delete landing page:", error);
		return {
			success: false,
			message: error?.response?.data?.message || "Erreur réseau",
			error: error?.response?.data?.error || error.message,
		};
	}
};
