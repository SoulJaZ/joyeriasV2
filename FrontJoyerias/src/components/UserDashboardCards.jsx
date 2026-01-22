export default function UserDashboardCards({ orders, payments, invoices }) {
  const pendientes = orders.filter(o => o.estado === "pendiente").length;
  const pagosPendientes = payments.filter(p => p.estado === "pendiente").length;

  return (
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

      <div className="card success">
        <h3>Facturas</h3>
        <p>{invoices.length}</p>
      </div>
    </div>
  );
}
