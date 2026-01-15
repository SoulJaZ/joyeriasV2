import { useEffect, useState } from "react";
import api from "../api/axios";

function OrderDetail({ data, onClose }) {
  return (
    <div style={modal}>
      <h3>Detalle del pedido #{data.order.id}</h3>

      <table width="100%" border="1" cellPadding="6">
        <thead>
          <tr>
            <th>Producto</th>
            <th>Cantidad</th>
            <th>Precio</th>
          </tr>
        </thead>

        <tbody>
          {data.items.map((i, idx) => (
            <tr key={idx}>
              <td>{i.nombre}</td>
              <td>{i.cantidad}</td>
              <td>${i.precio_unitario}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <p><b>Total:</b> ${data.order.total}</p>

      <button onClick={onClose}>Cerrar</button>
    </div>
  );
}

const modal = {
  marginTop: "20px",
  padding: "15px",
  border: "1px solid #ccc",
  background: "#f9f9f9"
};


export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {
    const { data } = await api.get("/orders/me");
    setOrders(data);
  };

  const loadDetail = async (id) => {
    const { data } = await api.get(`/orders/${id}/detail`);
    setSelected(data);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>📦 Mis pedidos</h2>

      <table border="1" cellPadding="8" width="100%">
        <thead>
          <tr>
            <th>ID</th>
            <th>Fecha</th>
            <th>Total</th>
            <th>Pedido</th>
            <th>Pago</th>
            <th></th>
          </tr>
        </thead>

        <tbody>
          {orders.map(o => (
            <tr key={o.id}>
              <td>{o.id}</td>
              <td>{new Date(o.fecha).toLocaleDateString()}</td>
              <td>${o.total}</td>
              <td>{o.estado_pedido}</td>
              <td>{o.estado_pago}</td>
              <td>
                <button onClick={() => loadDetail(o.id)}>
                  Ver detalle
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {selected && (
        <OrderDetail data={selected} onClose={() => setSelected(null)} />
      )}
    </div>
  );
}
