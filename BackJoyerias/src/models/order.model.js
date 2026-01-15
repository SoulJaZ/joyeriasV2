export const OrderModel = {
  id: Number,
  user_id: Number,
  total: Number,
  estado: 'pendiente' | 'pagado' | 'cancelado',
  fecha_creacion: String,
};
