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
        <AdminInvoices />
    </div>
  );
}
