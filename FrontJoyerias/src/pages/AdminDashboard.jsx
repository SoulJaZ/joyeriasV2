import { useAuth } from "../auth/AuthContext";
import Navbar from "../components/Navbar";
import "../components/dashboard.css"
import api from "../api/axios";
import DashboardCards from "../components/DashboardCards";
import LastOrdersTable from "../components/LastOrdersTable";
import LastPaymentsTable from "../components/LastPaymentsTable";
import { useEffect, useState } from "react";

export default function AdminDashboard() {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [payments, setPayments] = useState([]);
  const [invoices, setInvoices] = useState([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const [o, p , i] = await Promise.all([
      api.get("/orders"),
      api.get("/payments"),
      api.get("/invoices")
    ]);
    setOrders(o.data);
    setPayments(p.data);
    setInvoices(i.data);
  }

  return (
    
    <div>
        <Navbar />
      <h1>Panel de Administración</h1>
      <p>Admin: {user.nombre}</p>
      <div className="dashboard">
      <h2>📊 Dashboard Admin</h2>

      <DashboardCards
        orders={orders}
        payments={payments}
        invoices={invoices}
      />

      <div className="dashboard-grid">
        <LastOrdersTable orders={orders.slice(0, 5)} />
        <LastPaymentsTable payments={payments.slice(0, 5)} />
      </div>
    </div>
    </div>
  );
}
