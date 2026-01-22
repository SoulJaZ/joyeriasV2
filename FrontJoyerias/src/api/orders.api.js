import api from "./axios";

export const getAllOrders = () => 
  api.get("/orders");

export const updateOrderStatus = (id, estado) => api.put(`/orders/${id}/status`, { estado });

export const getMyOrders = () => api.get("/orders/me");
export const getOrderDetail = (id) => api.get(`/orders/${id}/detail`);