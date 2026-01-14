const db = require('../config/db');
const PDFDocument = require('pdfkit');

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

  if(!invoice){
    return res.status(404).json({ message: 'Factura no encontrada' });
  }

  const doc = new PDFDocument({ margin: 50 });

  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader(
    'Content-Disposition',
    `attachment; filename=${invoice.numero_factura}.pdf`
  );

  doc.pipe(res);

  // ENCABEZADO
  doc.fontSize(20).text('FACTURA DE COMPRA', { align: 'center' });
  doc.moveDown();

  doc.fontSize(12).text(`Factura: ${invoice.numero_factura}`);
  doc.text(`Cliente: ${invoice.nombre}`);
  doc.text(`Email: ${invoice.email}`);
  doc.text(`Fecha: ${invoice.fecha_emision}`);

  // 💰 TOTALES
  doc.text(`Subtotal: $${invoice.subtotal}`);
  doc.text(`Impuestos: $${invoice.impuestos}`);
  doc.fontSize(14).text(`TOTAL: $${invoice.total}`, { bold: true });

  doc.end();
};
