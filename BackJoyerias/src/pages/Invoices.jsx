import { useEffect, useState } from "react";
import { getMyInvoices, downloadInvoice } from "../api/invoices.api";
import "../components/InvoiceCards.css"
import AdminInvoices from "./AdminInvoices";


export default function Invoices() {
  const [invoices, setInvoices] = useState([]);

  useEffect(() => {
    loadInvoices();
  }, []);

  const loadInvoices = async () => {
    const { data } = await getMyInvoices();
    setInvoices(data);
  };

  // Manipulador de descarga
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
      <h2>🧾 Mis facturas</h2>

      <table className="admin-table">
        <AdminInvoices />
        <thead>
          <tr>
            <th>ID</th>
            <th>Pedido</th>
            <th>Fecha</th>
            <th>Total</th>
            <th>Descargar</th>
          </tr>
        </thead>

        <tbody>
          {invoices.map(i => (
            <tr key={i.id}>
              <td>{i.id}</td>
              <td>#{i.order_id}</td>
              <td>{new Date(i.fecha_emision).toLocaleDateString()}</td>
              <td>${i.total}</td>
              <td>
                <button onClick={() => handleDownload(i.id, i.numero_factura)}>
                  PDF
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
