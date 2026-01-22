import { useEffect, useState } from "react"
import api from "../api/axios";
;

function PaymentsCards({ payments }) {
    const pedido = payments.length;
    const pendientes = payments.filter(p => p.estado === "pendiente").length;
    const aprobados = payments.filter(p => p.estado === "aprobado").length;
    

    return (
    <div className="cards">
      <div className="card">
        <h3>Pedido</h3>
        <p>{pedido}</p>
      </div>

      <div className="card">
        <h3>Pendientes</h3>
        <p>{pendientes}</p>
      </div>

      <div className="card">
        <h3>Aprobados</h3>
        <p>{aprobados}</p>
      </div>
    </div>
  );
}

export default function Payments() {
    const [payments, setPayments] = useState([]);

    useEffect(() => {
        loadPayments();
    }, []);

    const loadPayments = async () => {
        const { data } = await api.get("/payments");
        setPayments(data);
    };

    return (
        <div style={{ padding: "20px" }}>
            <h2>💳 Pagos - Administración</h2>

            <PaymentsCards payments={payments} />

            <table className="admin-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Pedido</th>
                        <th>Cliente</th>
                        <th>Método</th>
                        <th>Monto</th>
                        <th>Estado</th>
                        <th>Acción</th>
                    </tr>
                </thead>

                <tbody>
                    {payments.map(p => (
                        <tr key={p.id}>
                            <td>{p.id}</td>
                            <td>#{p.order_id}</td>
                            <td>{p.cliente}</td>
                            <td>{p.metodo}</td>
                            <td>${p.monto}</td>

                            <td className={`status-${p.estado}`}>
                                {p.estado}
                            </td>

                            <td>
                                <select
                                    value={p.estado}>
                                    <option value="pendiente">Pendiente</option>
                                    <option value="aprobado">Aprobado</option>
                                    <option value="rechazado">Rechazado</option>
                                </select>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
