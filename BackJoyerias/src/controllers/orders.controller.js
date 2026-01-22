const db = require('../config/db');

// CREAR PEDIDO (USER)
exports.create = async (req, res) => {
  const userId = req.user.id;

  const [[cart]] = await db.query(
    `SELECT id FROM carts WHERE user_id = ? AND estado = 'activo'`,
    [userId]
  );

  if (!cart) {
    return res.status(400).json({ message: 'Carrito vacío' });
  }

  const [items] = await db.query(
    `SELECT * FROM cart_items WHERE cart_id = ?`,
    [cart.id]
  );

  if (!items.length) {
    return res.status(400).json({ message: 'Carrito sin productos' });
  }

  const [order] = await db.query(
    `INSERT INTO orders (user_id, total) VALUES (?, 0)`,
    [userId]
  );

  for (const item of items) {
    await db.query(
      `INSERT INTO order_items
       (order_id, product_id, cantidad, precio_unitario)
       VALUES (?, ?, ?, ?)`,
      [order.insertId, item.product_id, item.cantidad, item.precio_unitario]
    );
  }

  await db.query(
    `UPDATE carts SET estado = 'cerrado' WHERE id = ?`,
    [cart.id]
  );

  res.status(201).json({
    message: 'Pedido creado correctamente',
    order_id: order.insertId
  });
};

// 🔹 USER → MIS PEDIDOS
exports.getMyOrders = async (req, res) => {
  const userId = req.user.id;

  const [orders] = await db.query(
    `SELECT 
        o.id,
        o.fecha,
        o.total,
        o.estado AS estado,
        COALESCE(p.estado, 'sin_pago') AS estado_pago
     FROM orders o
     LEFT JOIN payments p
       ON p.id = (
         SELECT id
         FROM payments
         WHERE order_id = o.id
         ORDER BY fecha_pago DESC
         LIMIT 1
       )
     WHERE o.user_id = ?
     ORDER BY o.fecha DESC`,
    [userId]
  );

  res.json(orders);
};

// Mostrar productos por pedido
exports.getOrderDetail = async (req, res) => {
  const { id } = req.params;
  const userId = req.user.id;

  const [[order]] = await db.query(
    `SELECT * FROM orders WHERE id = ? AND user_id = ?`,
    [id, userId]
  );

  if (!order) {
    return res.status(404).json({ message: 'Pedido no encontrado' });
  }

  const [items] = await db.query(
    `SELECT p.nombre, oi.cantidad, oi.precio_unitario
     FROM order_items oi
     JOIN products p ON p.id = oi.product_id
     WHERE oi.order_id = ?`,
    [id]
  );

  res.json({ order, items });
};
// 🔹 ADMIN → DETALLE DE PEDIDO



// 🔹 ADMIN → TODOS LOS PEDIDOS
exports.getAll = async (req, res) => {
  const [orders] = await db.query(
    `SELECT o.*, u.nombre AS cliente
     FROM orders o
     JOIN users u ON u.id = o.user_id
     ORDER BY o.fecha DESC`
  );

  res.json(orders);
};

// UPDATE STATUS (ADMIN)
// 💡 Aquí se activa trigger de stock
exports.updateStatus = async (req, res) => {
  const { id } = req.params;
  const { estado } = req.body;

  const estadosValidos = ['enviado', 'entregado', 'cancelado'];

  if (!estadosValidos.includes(estado)) {
    return res.status(400).json({ message: 'Estado no permitido' });
  }

  const [result] = await db.query(
    `UPDATE orders SET estado = ? WHERE id = ?`,
    [estado, id]
  );

  if (!result.affectedRows) {
    return res.status(404).json({ message: 'Pedido no encontrado' });
  }

  res.json({ message: `Pedido marcado como ${estado}` });

 

  res.json({ message: "Estado del pago actualizado" });
};

// 🔹 ADMIN → DETALLE DE PEDIDO
exports.getOrderById = async (req, res) => {
  const { id } = req.params;

  const [[order]] = await db.query(
    `SELECT o.*, u.nombre, u.email
     FROM orders o
     JOIN users u ON u.id = o.user_id
     WHERE o.id = ?`,
    [id]
  );

  if (!order) {
    return res.status(404).json({ message: 'Pedido no encontrado' });
  }

  const [items] = await db.query(
    `SELECT p.nombre, oi.cantidad, oi.precio_unitario
     FROM order_items oi
     JOIN products p ON p.id = oi.product_id
     WHERE oi.order_id = ?`,
    [id]
  );

  res.json({ order, items });
};

