import api from "@configs/api";


const RESOURCE = "/user/payments";

/**
 * Récupère les factures (payments) de l'utilisateur authentifié.
 * Retourne { success, data, message, errors?, status? }
 */

export const getUserInvoices = async () => {
  try {
    const response = await api.get(RESOURCE);
    return {
      success: true,
      data: response.data,
      message: "Factures récupérées avec succès",
    };
  } catch (error) {
    return {
      success: false,
      message:
        error?.response?.data?.message ||
        error?.message ||
        "Erreur lors de la récupération des factures",
      errors: error?.response?.data?.errors || {},
      status: error?.response?.status,
    };
  }
};
