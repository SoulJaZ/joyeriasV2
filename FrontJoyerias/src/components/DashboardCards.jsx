export default function DashboardCards({ orders, payments, invoices }) {
  const pedidosPendientes = orders.filter(o => o.estado === "pendiente").length;
  const pagosPendientes = payments.filter(p => p.estado === "pendiente").length;
  const pagosAprobados = payments.filter(p => p.estado === "aprobado").length;

  const totalFacturado = invoices.reduce(
    (acc, i) => acc + Number(i.total),
    0
  );

  return (
    <div className="cards">
      <div className="card">
        <h3>Pedidos</h3>
        <p>{orders.length}</p>
      </div>

      <div className="card warning">
        <h3>Pedidos pendientes</h3>
        <p>{pedidosPendientes}</p>
      </div>

      <div className="card danger">
        <h3>Pagos pendientes</h3>
        <p>{pagosPendientes}</p>
      </div>

      <div className="card success">
        <h3>Total facturado</h3>
        <p>${totalFacturado}</p>
      </div>
    </div>
  );
}
