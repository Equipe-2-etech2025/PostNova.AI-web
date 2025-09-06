import api from "@configs/api";

export const getAllInvoices = async () => {
  try {
    const response = await api.get("/admin/payments");
    return {
      success: true,
      data: response.data,
    };
  } catch (error) {
    return {
      success: false,
      message: error.message,
    };
  }
};
