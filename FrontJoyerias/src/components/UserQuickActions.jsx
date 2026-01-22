import { Link } from "react-router-dom";

export default function UserQuickActions() {
  return (
    <div className="cards">
      <div className="card">
        <Link to="/orders">📦 Ver pedidos</Link>
      </div>

      <div className="card">
        <Link to="/payments">💳 Ver pagos</Link>
      </div>

      <div className="card">
        <Link to="/invoices">🧾 Ver facturas</Link>
      </div>
    </div>
  );
}
