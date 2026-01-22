import { useEffect, useState } from "react";
import { useAuth } from "../auth/AuthContext";
import api from "../api/axios";
import "../components/dashboard.css";

export default function UserDashboard() {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [payments, setPayments] = useState([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const [o, p] = await Promise.all([
      api.get("/orders/me"),
      api.get("/payments/me"),
    ]);

    setOrders(o.data);
    setPayments(p.data);
  };

  const pendientes = orders.filter(o => o.estado_pedido === "pendiente").length;
  const pagosPendientes = payments.filter(p => p.estado === "pendiente").length;

  return (
    <div className="dashboard">
      <h2>👋 Bienvenido, {user.nombre}</h2>

      <div className="cards">
        <div className="card">
          <h3>Mis pedidos</h3>
          <p>{orders.length}</p>
        </div>

        <div className="card warning">
          <h3>Pedidos pendientes</h3>
          <p>{pendientes}</p>
        </div>

        <div className="card danger">
          <h3>Pagos pendientes</h3>
          <p>{pagosPendientes}</p>
        </div>
      </div>
    </div>
  );
}
