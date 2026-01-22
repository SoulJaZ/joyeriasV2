export const PaymentModel = {
  id: Number,
  order_id: Number,
  metodo_pago: String,
  referencia: String,
  monto: Number,
  estado: 'pendiente' | 'aprobado' | 'rechazado',
  fecha_pago: String,
};
