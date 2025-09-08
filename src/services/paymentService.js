import api from "@configs/api";

const API_BASE_URL = "http://localhost:8000/api/mvola/payments";

export const createPayment = async ({
	amount,
	description,
	currency,
	customer_msisdn,
	merchant_msisdn,
	user_id,
}) => {
	try {
		const response = await api.post(`${API_BASE_URL}`, {
			data: {
				amount,
				description,
				currency,
				customer_msisdn,
				merchant_msisdn,
				user_id,
			},
		});

		if (!response.ok) {
			throw new Error(
				`Erreur lors de la création du paiement : ${response.status}`
			);
		}

		return await response.json();
	} catch (error) {
		console.error("Erreur createPayment:", error.message);
		throw error;
	}
};

export const initiatePayment = async (postData) => {
	try {
		const response = await api.post("/mvola/payments", postData);
		return {
			success: true,
			data: response.data,
			message: "Abonnement payé avec succès",
		};
	} catch (error) {
		return {
			success: false,
			message: error.message,
			errors: error.response?.data?.errors || {},
		};
	}
};

/*export const getPaymentStatus = async (paymentId) => {
	try {
		const response = await fetch(
			`${API_BASE_URL}/mvola/payments/${paymentId}/status`
		);
		if (!response.ok) {
			throw new Error(
				`Erreur lors de la récupération du statut : ${response.status}`
			);
		}
		return await response.json();
	} catch (error) {
		console.error("Erreur getPaymentStatus:", error.message);
		throw error;
	}*
};*/
