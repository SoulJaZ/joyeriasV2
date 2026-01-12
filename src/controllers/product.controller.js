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
    categoria_id,
  } = req.body;

  if (
    !nombre ||
    !precio ||
    !descripcion ||
    !stock ||
    !material ||
    !tipo_gema ||
    !peso ||
    !certificado ||
    !categoria_id
  ) {
    return res
      .status(400)
      .json({
        message: "Completar los campos vacios. Datos son obligatorios.",
      });
  }

  await db.query(
    `INSERT INTO products (nombre,
    descripcion,
    precio,
    stock,
    material,
    tipo_gema,
    peso,
    certificado,
    categoria_id,)
    VALUES (?, ?, ?, ?, ?)`,
    [nombre, descripcion, precio, stock, material, tipo_gema, peso, certificado, categoria_id]
  );

  res.status(201).json({ message: 'Producto creado correctamente.'})
};

// OBTENER PRODUCTOS.
exports.getAll = async (req, res) => {
  const [products] = await db.query('SELECT * FROM products');
  res.json(products);
};

// ACTUALIZAR PRODUCTOS.
exports.update = async (req, res) => {
    const { id } = req.params;
    const { nombre, descripcion, precio, stock, material, tipo_gema, peso, certificado, categoria_id } = req.body;

    await db.query(
        `UPDATE products
        SET nombre=?, descripcion=?, precio=?, stock=?, material=?, tipo_gema=?, peso=?, certificado=?, categoria_id=?
        WHERE id=?`,
        [nombre, descripcion, precio, stock, material, tipo_gema, peso, certificado, categoria_id]
    );

    res.json({ message: 'Product actualizado correctamente.' })
};

// ELIMINAR PRODUCTOS.
exports.remove = async (req, res) => {
    const { id } = req.params;

    await db.query('DELETE FROM products WHERE id = ?', [id]);

    res.json({ message: 'Producto eliminado.' });
};
