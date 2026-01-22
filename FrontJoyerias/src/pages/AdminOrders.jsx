import { useEffect, useState } from "react";
import OrdersAdminCards from "../components/OrdersAdminCards";
import api from "../api/axios";
import "../components/AdminCards.css"
import { updateOrderStatus } from "../api/orders.api";

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {
    const { data } = await api.get("/orders");
    setOrders(data);
  };

  return (
    <div>
        <h2>🔨 Administración de pedidos</h2>
        {/* <OrdersAdminCards orders={orders} /> */}

        <table className="admin-table">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Cliente</th>
                    <th>Fecha</th>
                    <th>Total</th>
                    <th>Estado</th>
                    <th>Acción</th>
                </tr>
            </thead>
            <tbody>
                {orders.map(o => (
                    <tr key={o.id}>
                        <td>{o.id}</td>
                        <td>{o.cliente}</td>
                        <td>{new Date(o.fecha).toLocaleDateString()}</td>
                        <td>${o.total}</td>
                        <td className={`status-${o.estado}`}>{o.estado}</td>
                        <td>
                            <select
                                value={o.estado}
                                onChange={e =>
                                    updateOrderStatus(o.id, e.target.value)
                                }
                            >
                                <option value="pendiente">Pendiente</option>
                                <option value="enviado">Enviado</option>
                                <option value="entregado">Entregado</option>
                                <option value="cancelado">Cancelado</option>
                            </select>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
  )
}
