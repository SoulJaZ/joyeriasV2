export default function OrdersAdminCards({ orders }) {
  const total = orders.length;
  const pendientes = orders.filter(o => o.estado === "pendiente").length;
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
