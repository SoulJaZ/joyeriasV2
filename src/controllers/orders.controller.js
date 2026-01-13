const db = require('../config/db');

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
