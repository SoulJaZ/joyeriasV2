const db = require('../config/db');


// GET ALL.
exports.getAll = async (req, res) => {
  const [rows] = await db.query(
    'SELECT id,nombre,email,telefono,estado,role_id FROM users'
  );
  res.json(rows);
};


// OBTENER POR ID.
exports.getById = async (req, res) => {
  const [rows] = await db.query(
    'SELECT id,nombre,email,telefono,estado,role_id FROM users WHERE id=?',
    [req.params.id]
  );
  if (!rows.length) return res.status(404).json({ message: 'Usuario no encontrado' });
  res.json(rows[0]);
};

// ACTUALIZAR USUARIO
exports.update = async (req, res) => {
  const { nombre, telefono, estado, role_id } = req.body;

  const [result] = await db.query(
    `UPDATE users SET nombre=?, telefono=?, estado=?, role_id=? WHERE id=?`,
    [nombre, telefono, estado, role_id, req.params.id]
  );

  if (!result.affectedRows)
    return res.status(404).json({ message: 'Usuario no encontrado' });

  res.json({ message: 'Usuario actualizado' });
};
// ELIMINAR USUARIO
exports.remove = async (req, res) => {
  await db.query(
    'UPDATE users SET estado="inactivo" WHERE id=?',
    [req.params.id]
  );
  res.json({ message: 'Usuario desactivado' });
};
