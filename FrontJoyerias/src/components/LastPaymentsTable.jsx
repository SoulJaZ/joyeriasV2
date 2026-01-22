export default function LastPaymentsTable({ payments }) {
  return (
    <div>
      <h3>💳 Últimos pagos</h3>

      <table className="admin-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Pedido</th>
            <th>Monto</th>
            <th>Estado</th>
          </tr>
        </thead>
        <tbody>
          {payments.map(p => (
            <tr key={p.id}>
              <td>{p.id}</td>
              <td>#{p.order_id}</td>
              <td>${p.monto}</td>
              <td className={`status-${p.estado}`}>
                {p.estado}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
