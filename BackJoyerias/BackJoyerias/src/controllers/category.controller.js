const db = require('../config/db');

// GET ALL
exports.getAll = async (req, res) => {
  const [rows] = await db.query(
    'SELECT * FROM categories WHERE estado = "activo"'
  );
  res.json(rows);
};

// GET BY ID
exports.getById = async (req, res) => {
  const { id } = req.params;

  const [rows] = await db.query(
    'SELECT * FROM categories WHERE id = ?',
    [id]
  );

  if (rows.length === 0) {
    return res.status(404).json({ message: 'Categoría no encontrada' });
  }

  res.json(rows[0]);
};

// CREATE
exports.create = async (req, res) => {
  const { nombre, descripcion } = req.body;

  if (!nombre) {
    return res.status(400).json({ message: 'Nombre es obligatorio' });
  }

  const [result] = await db.query(
    'INSERT INTO categories (nombre, descripcion) VALUES (?, ?)',
    [nombre, descripcion]
  );

  res.status(201).json({
    message: 'Categoría creada correctamente',
    id: result.insertId
  });
};

// UPDATE
exports.update = async (req, res) => {
  const { id } = req.params;
  const { nombre, descripcion, estado } = req.body;

  const [result] = await db.query(
    `UPDATE categories SET
      nombre = ?,
      descripcion = ?,
      estado = ?
     WHERE id = ?`,
    [nombre, descripcion, estado, id]
  );

  if (result.affectedRows === 0) {
    return res.status(404).json({ message: 'Categoría no encontrada' });
  }

  res.json({ message: 'Categoría actualizada correctamente' });
};

// DELETE (LÓGICO)
exports.remove = async (req, res) => {
  const { id } = req.params;

  const [result] = await db.query(
    'UPDATE categories SET estado = "inactivo" WHERE id = ?',
    [id]
  );

  if (result.affectedRows === 0) {
    return res.status(404).json({ message: 'Categoría no encontrada' });
  }

  res.json({ message: 'Categoría desactivada correctamente' });
};
