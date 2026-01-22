import { useEffect, useState } from "react";
import api from "../api/axios";
import "../components/AdminCards.css"
import { getMyOrders, updateOrderStatus } from "../api/orders.api";

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
export default function OrdersUsers() {
    const [orders, setOrders] = useState([]);
    const [selected, setSelected] = useState(null);

    useEffect(() => {
        loadOrders();
    }, []);

    const loadOrders = async () => {
        const { data } = await getMyOrders();
        setOrders(data);
    };
    const loadDetail = async (id) => {
        const { data } = await api.get(`/orders/${id}/detail`);
        setSelected(data);
    };

    return (
        <div>
            <h2>🔨 Pedidos</h2>
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
                            <td>

                            </td>
                            <button onClick={() => loadDetail(o.id)}>
                                Ver detalle
                            </button>

                        </tr>
                    ))}
                </tbody>
            </table>
            {selected && (
                <OrderDetail data={selected} onClose={() => setSelected(null)} />
            )}
        </div>
    )
}
