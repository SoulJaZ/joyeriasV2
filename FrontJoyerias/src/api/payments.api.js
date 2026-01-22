import api from "./axios";

export const getAllPayments = () => {
    api.get("/payments");
} 
export const updatePaymentStatus = (id, estado) => 
    api.put(`/payments/${id}/status`, { estado });