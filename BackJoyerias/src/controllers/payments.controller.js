const db = require("../config/db");

// OBTENER TODOS LOS PAGOS/PEDIDOS
exports.getAll = async (req, res) => {
  const [rows] = await db.query(
    `SELECT p.*, u.nombre AS usuario
     FROM payments p
     JOIN orders o ON o.id = p.order_id
     JOIN users u ON u.id = o.user_id
     ORDER BY p.fecha_pago DESC`
  );

  res.json(rows);
};
// CREAR PEDIDO
exports.create = async (req, res) => {
  const userId = req.user.id;
  const { order_id, metodo_pago, referencia, monto } = req.body;

  if (!order_id || !metodo_pago || !monto) {
    return res.status(400).json({ message: "Datos incompletos" });
  }

  // Verificar pedido
  const [[order]] = await db.query(
    `SELECT * FROM orders WHERE id = ? AND user_id = ?`,
    [order_id, userId]
  );

  if (!order) {
    return res.status(404).json({ message: "Pedido no encontrado" });
  }

  // Crear pago
  const [result] = await db.query(
    `INSERT INTO payments
     (order_id, metodo_pago, referencia, monto, estado, fecha_pago)
     VALUES (?, ?, ?, ?, 'pendiente', NOW())`,
    [order_id, metodo_pago, referencia, monto]
  );

  res.status(201).json({
    message: "Pago registrado, pendiente de aprobación",
    payment_id: result.insertId,
  });
};
exports.updateStatus = async (req, res) => {
  const { id } = req.params;
  const { estado } = req.body;

  const estadosValidos = ["aprobado", "rechazado"];

  if (!estadosValidos.includes(estado)) {
    return res.status(400).json({ message: "Estado no permitido" });
  }

  // 1️⃣ Actualizar pago
  const [result] = await db.query(
    `UPDATE payments SET estado = ? WHERE id = ?`,
    [estado, id]
  );

  if (!result.affectedRows) {
    return res.status(404).json({ message: "Pago no encontrado" });
  }

  // 2️⃣ Si se aprueba → actualizar pedido + factura
  if (estado === "aprobado") {
    await db.query(
      `UPDATE orders
       SET estado = 'pagado'
       WHERE id = (SELECT order_id FROM payments WHERE id = ?)`,
      [id]
    );

    const [[order]] = await db.query(
      `SELECT id, total FROM orders
       WHERE id = (SELECT order_id FROM payments WHERE id = ?)`,
      [id]
    );

    const impuestos = order.total * 0.19;
    const subtotal = order.total - impuestos;
    const numeroFactura = `FAC-${Date.now()}`;

    await db.query(
      `INSERT INTO invoices
       (order_id, numero_factura, subtotal, impuestos, total)
       VALUES (?, ?, ?, ?, ?)`,
      [order.id, numeroFactura, subtotal, impuestos, order.total]
    );
  }

  res.json({ message: "Estado del pago actualizado" });
};


// OBTENER PAGO (USER)
exports.getMyPayments = async (req, res) => {
  const userId = req.user.id;

  const [rows] = await db.query(
    `SELECT p.*, o.estado AS estado_pedido
     FROM payments p
     JOIN orders o ON o.id = p.order_id
     WHERE o.user_id = ?`,
    [userId]
  );

  res.json(rows);
};
