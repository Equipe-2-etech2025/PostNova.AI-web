import api from "@configs/api";

export const generateImageService = async (data) => {
	try {
		const response = await api.post("/generate-images", data);
		return {
			success: true,
			images: response.data.images,
		};
	} catch (error) {
		console.error("Erreur génération images:", error);

		if (error.response?.status === 429) {
			return {
				success: false,
				type: "quota_exceeded",
				message: "Quota d'images dépassé",
			};
		}

		return {
			success: false,
			message:
				error.response?.data?.message || "Erreur lors de la génération des images",
		};
	}
};
