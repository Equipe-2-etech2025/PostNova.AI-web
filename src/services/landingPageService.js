import api from "@configs/api";

const renderError = (err) => {
	return {
		success: false,
		message: err?.response?.data?.message || "Erreur réseau",
		error: err?.response?.data?.error || err.message,
	};
};

export const landingPageService = {
	async generate(params) {
		try {
			const res = await api.post(`/landing-pages/generate`, params);
			return res.data;
		} catch (err) {
			return renderError(err);
		}
	},

	async generateV2(params) {
		try {
			const res = await api.post(`/v2/landing-page/generate`, params);
			return res.data;
		} catch (err) {
			return renderError(err);
		}
	},

	async getAll(params) {
		try {
			const res = await api.get(`/landing-pages`, { params });
			return res.data;
		} catch (err) {
			return renderError(err);
		}
	},

	async getOne(id) {
		try {
			const res = await api.get(`/landing-pages/${id}`);
			return res.data;
		} catch (err) {
			return renderError(err);
		}
	},

	async update(id, params) {
		try {
			const res = await api.put(`/landing-pages/${id}`, params);
			return res.data;
		} catch (err) {
			return renderError(err);
		}
	},

	async delete(id) {
		try {
			const res = await api.delete(`/landing-pages/${id}`);
			return res.data;
		} catch (err) {
			return renderError(err);
		}
	},
};
