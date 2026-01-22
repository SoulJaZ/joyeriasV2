import { useEffect, useState } from "react";
import api from "../api/axios";
import "../components/OrdersCards.css"
import AdminOrders from "./AdminOrders";

function OrdersCards({ orders }) {
  const total = orders.length;
  const pendientes = orders.filter(o => o.estado === "pendiente").length;
  const pagados = orders.filter(o => o.estado_pago === "aprobado").length;
  const enviados = orders.filter(o => o.estado === "enviado").length;
  const entregados = orders.filter(o => o.estado === "entregado").length;

  const totalVentas = orders.reduce(
    (acc, o) => acc + Number(o.total),
    0
  );
  return (
    
    <div className="cards">
       
      <Card title="Pedidos totales" value={total} />
      <Card title="Pendientes" value={pendientes} />
      <Card title="Enviados" value={enviados} />
      <Card title="Entregados" value={entregados} />
      <Card title="Pagados" value={pagados} />
      <Card title="Ventas totales" value={`$${totalVentas.toLocaleString()}`} />
    
    </div>
  );
}
function Card({ title, value }) {
  return (
    <div className="card admin">
      <h3>{title}</h3>
      <p>{value}</p>
    </div>
  );
}

function OrderDetail({ data, onClose }) {
  return (
    <div style={modal}>
      <h3>Detalle del pedido #{data.order.id}</h3>

      <table width="100%" border="1" cellPadding="6" className="admin-table">
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
    const { data } = await api.get("/orders");
    setOrders(data);
  };

  const loadDetail = async (id) => {
    const { data } = await api.get(`/orders/${id}/detail`);
    setSelected(data);
  };

  return (
    <div style={{ padding: "20px" }}>
      <AdminOrders />
      {/* Cards arriba */}
      <OrdersCards orders={orders} />

      <h2>📦 Mis pedidos</h2>

      <table border="1" cellPadding="8" width="100%" className="admin-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Fecha</th>
            <th>Total</th>
            <th>Pedido</th>
            <th>Usuario</th>
 
            <th></th>
          </tr>
        </thead>

        <tbody>
          {orders.map(o => (
            <tr key={o.id}>
              <td>{o.id}</td>
              <td>{new Date(o.fecha).toLocaleDateString()}</td>
              <td>${o.total}</td>
              <td>{o.estado}</td>
              <td>{o.cliente}</td>

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



