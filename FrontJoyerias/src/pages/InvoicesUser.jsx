import { useEffect, useState } from "react";
import { getAllInvoices, downloadInvoice, getMyInvoices } from "../api/invoices.api";
import InvoiceAdminCards from "../components/InvoicesAdminCards";


export default function InvoicesUser() {
  const [invoices, setInvoices] = useState([]);

  useEffect(() => {
    loadInvoices();
  }, []);

  const loadInvoices = async () => {
    const { data } = await getMyInvoices();
    setInvoices(data);
  };

  const handleDownload = async (id, numero) => {
    const res = await downloadInvoice(id);
    const url = window.URL.createObjectURL(new Blob([res.data]));
    
    const a = document.createElement("a");
    a.href = url;
    a.download = `${numero}.pdf`;
    a.click();
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>🗂 facturas</h2>

      <InvoiceAdmi  nCards invoices={invoices} />

      <table className="admin-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Factura</th>
            <th>Cliente</th>
            <th>Pedido</th>
            <th>Total</th>
            <th>Fecha</th>
            <th>PDF</th>
          </tr>
        </thead>

        <tbody>
          {invoices.map(i => (
            <tr key={i.id}>
              <td>{i.id}</td>
              <td>{i.numero_factura}</td>
              <td>{i.cliente}</td>
              <td>#{i.order_id}</td>
              <td>${i.total}</td>
              <td>{new Date(i.fecha_emision).toLocaleDateString()}</td>
              <td>
                <button onClick={() => handleDownload(i.id, i.numero_factura)}>
                  Descargar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
