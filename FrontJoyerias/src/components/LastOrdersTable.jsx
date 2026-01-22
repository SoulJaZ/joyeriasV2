export default function LastOrdersTable({ orders }) {
  return (
    <div>
      <h3>📦 Últimos pedidos</h3>

      <table className="admin-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Cliente</th>
            <th>Total</th>
            <th>Estado</th>
          </tr>
        </thead>
        <tbody>
          {orders.map(o => (
            <tr key={o.id}>
              <td>{o.id}</td>
              <td>{o.cliente}</td>
              <td>${o.total}</td>
              <td className={`status-${o.estado}`}>
                {o.estado}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
