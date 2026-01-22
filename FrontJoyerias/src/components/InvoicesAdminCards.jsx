export default function InvoiceAdminCards({ invoices }) {
  const total = invoices.length;
  const totalVentas = invoices.reduce((acc, i) => acc + Number(i.total), 0);

  return (
    <div className="cards">
      <div className="card">
        <h3>Facturas</h3>
        <p>{total}</p>
      </div>

      <div className="card">
        <h3>Total facturado</h3>
        <p>${totalVentas}</p>
      </div>
    </div>
  );
}
