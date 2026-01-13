const db = require("../config/db");

// CREAR PRODUCTO.
exports.create = async (req, res) => {
  const {
    nombre,
    descripcion,
    precio,
    stock,
    material,
    tipo_gema,
    peso,
    certificado,
    category_id,
  } = req.body;

  // Validacion
  // Validar que la categoría exista
  const [category] = await db.query("SELECT id FROM categories WHERE id = ?", [
    category_id,
  ]);

  if (category.length === 0) {
    return res.status(400).json({
      message: "La categoría no existe",
    });
  }
  if (!nombre || !precio || !stock || !category_id) {
    return res.status(400).json({
      message: "Completar los campos vacios. Datos son obligatorios.",
    });
  }

  await db.query(
    `INSERT INTO products (
    nombre,
    descripcion,
    precio,
    stock,
    material,
    tipo_gema,
    peso,
    certificado,
    category_id)
   VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      nombre,
      descripcion || null,
      precio,
      stock,
      material || null,
      tipo_gema || null,
      peso || null,
      certificado ?? 0,
      category_id,
    ]
  );

  res.status(201).json({ message: "Producto creado correctamente." });
};

// OBTENER PRODUCTOS.
exports.getAll = async (req, res) => {
  const [products] = await db.query("SELECT * FROM products");
  res.json(products);
};

// OBTNER PRODUCTOS POR ID.
exports.getById = async (req, res) => {
  const { id } = req.params;

  const [rows] = await db.query(
    'SELECT * FROM products WHERE id = ?',
    [id]
  );

  if (rows.length === 0) {
    return res.status(404).json({ message: 'Producto no encontrado' });
  }

  res.json(rows[0]);
};


// ACTUALIZAR PRODUCTOS.
exports.update = async (req, res) => {
  const { id } = req.params;
  const {
    nombre,
    descripcion,
    precio,
    stock,
    material,
    tipo_gema,
    peso,
    certificado,
    category_id,
  } = req.body;

  const [result] = await db.query(
    `UPDATE products SET
        nombre = ?, descripcion = ?, precio = ?, stock = ?, material = ?, tipo_gema = ?, peso = ?, certificado = ?, category_id = ?
        WHERE id = ?`,
    [
      nombre,
      descripcion,
      precio,
      stock,
      material,
      tipo_gema,
      peso,
      certificado,
      category_id,
      id
    ]
  );
  if (result.affectedRows === 0) {
    return res.status(404).json({ message: 'Producto no encontrado' });
  }

  res.json({ message: "Product actualizado correctamente." });
};

// ELIMINAR PRODUCTOS.
exports.remove = async (req, res) => {
  const { id } = req.params;

  const [result] = await db.query("DELETE FROM products WHERE id = ?", [id]);
    if(result.affectedRows === 0){
        return res.status(404).json({ message: '´Producto no encontrado.' })
    }
  res.json({ message: "Producto eliminado." });
};
