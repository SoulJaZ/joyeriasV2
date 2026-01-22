import { useEffect, useState } from "react";
import PaymentsAdminCards from "../components/PaymentsAdminCards";
import api from "../api/axios";
import "../components/AdminCards.css";
import { updatePaymentStatus } from "../api/payments.api";

export default function AdminPayments() {
  const [payments, setPayments] = useState([]);

  useEffect(() => {
    loadPayments();
  }, []);

  const loadPayments = async () => {
    const { data } = await api.get("/payments");
    setPayments(data);
  };

  const handleStatusChange = async (id, status) => {
    await updatePaymentStatus(id, status);
    loadPayments();
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>🗂 Administración de pagos</h2>

      <PaymentsAdminCards payments={payments} />

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
                  value={p.estado}
                  onChange={e =>
                    handleStatusChange(p.id, e.target.value)
                  }
                >
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
