export const getAllOrders = () => api.get("/orders");
export const updateOrderStatus = (id, estado) =>
  api.put(`/orders/${id}/status`, { estado });
