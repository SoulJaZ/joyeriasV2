const db = require("../config/db");
const PDFDocument = require("pdfkit");

// USER
exports.getMyInvoices = async (req, res) => {
  const userId = req.user.id;

  const [rows] = await db.query(
    `SELECT i.*, o.estado
     FROM invoices i
     JOIN orders o ON o.id = i.order_id
     WHERE o.user_id = ?`,
    [userId]
  );

  res.json(rows);
};

// ADMIN
exports.getAll = async (req, res) => {
  const [rows] = await db.query(
    `SELECT i.*, u.nombre AS cliente
     FROM invoices i
     JOIN orders o ON o.id = i.order_id
     JOIN users u ON u.id = o.user_id
     ORDER BY i.fecha_emision DESC`
  );

  res.json(rows);
};

exports.downloadInvoice = async (req, res) => {
  const { id } = req.params;

  const [[invoice]] = await db.query(
    `SELECT i.*, u.nombre, u.email
     FROM invoices i
     JOIN orders o ON o.id = i.order_id
     JOIN users u ON u.id = o.user_id
     WHERE i.id = ?`,
    [id]
  );

  const [items] = await db.query(
    `SELECT 
     oi.cantidad,
     oi.precio_unitario,
     p.nombre
   FROM order_items oi
   JOIN products p ON p.id = oi.product_id
   WHERE oi.order_id = ?`,
    [invoice.order_id]
  );

  if (!invoice) {
    return res.status(404).json({ message: "Factura no encontrada" });
  }

  const doc = new PDFDocument({ margin: 50 });

  res.setHeader("Content-Type", "application/pdf");
  res.setHeader(
    "Content-Disposition",
    `attachment; filename=${invoice.numero_factura}.pdf`
  );

  doc.pipe(res);

  // ENCABEZADO
  doc.fontSize(20).text("FACTURA DE COMPRA", { align: "center" });
  doc.moveDown();

  doc.fontSize(12).text(`Factura: ${invoice.numero_factura}`);
  doc.text(`Cliente: ${invoice.nombre}`);
  doc.text(`Email: ${invoice.email}`);
  doc.text(`Fecha: ${new Date(invoice.fecha_emision).toLocaleString()}`);

  doc.moveDown();
  doc.fontSize(14).text("Detalle de productos", { underline: true });
  doc.moveDown(0.5);

  // Encabezados
  doc.fontSize(11);
  doc.text("Producto", 50);
  doc.text("Cantidad", 300);
  doc.text("Precio", 380);
  doc.text("Subtotal", 460);

  doc.moveDown(0.3);
  doc.moveTo(50, doc.y).lineTo(550, doc.y).stroke();

  // Items
  items.forEach((item) => {
    const subtotal = item.cantidad * item.precio_unitario;

    doc.moveDown(0.3);
    doc.text(item.nombre, 50);
    doc.text(item.cantidad.toString(), 300);
    doc.text(`$${item.precio_unitario}`, 380);
    doc.text(`$${subtotal}`, 460);
    
  });
  doc
    .fontSize(14)
    .text(`TOTAL: $${invoice.total.toLocaleString()}`, { bold: true });

  // 💰 TOTALES
  // doc.text(`Subtotal: $${invoice.subtotal.toLocaleString()}`);
  // doc.text(`Impuestos: $${invoice.impuestos.toLocaleString()}`);
  doc.end();
};
