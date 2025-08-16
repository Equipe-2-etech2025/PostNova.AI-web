import api from "@configs/api";

export const imageService = {
	async getAllImages() {
		try {
			const response = await api.get("/images/");
			return {
				success: true,
				data: response.data,
			};
		} catch (error) {
			return {
				success: false,
				message: "Impossible de récupérer les images",
				error: error.message,
			};
		}
	},

	async getImageById(id) {
		try {	
			const response = await api.get(`/images/${id}`);
			return {
				success: true,
				data: response.data,
			};
		}
		catch (error) {
			return {
				success: false,
				message: `Impossible de récupérer l'image avec l'ID ${id}`,
				error: error.message,
			};
		}
	},	

	async creteImage(imageData) {
		try {
			const response = await api.post("/images", imageData);
			return {
				success: true,
				data: response.data,
				message: "Image créée avec succès",
			};
		} catch (error) {
			return {
				success: false,
				message: "Erreur lors de la création de l'image",
				error: error.message,
			};
		}
	},

	async updateImage(id, imageData) {
		try {
			const response = await api.put(`/images/${id}`, imageData);
			return {
				success: true,
				data: response.data,
				message: "Image mise à jour avec succès",
			};
		}	 catch (error) {
			return {
				success: false,
				message: `Erreur lors de la mise à jour de l'image ID ${id}`,
				error: error.message,
			};
		}
	},

	async deleteImage(id) {
		try {
			const response = await api.delete(`/images/${id}`);
			return {
				success: true,
				message: response.data.message || "Image supprimée avec succès",
			};
		}	 catch (error) {
			return {
				success: false,
				message: `Erreur lors de la suppression de l'image ID ${id}`,
				error: error.message,
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
