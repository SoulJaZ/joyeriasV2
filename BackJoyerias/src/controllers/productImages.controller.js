// CREAR IMAGEN DEL PRODUCTO.

exports.create = async (req, res) => {
  const { product_id, url_imagen, es_principal } = req.body;

  await db.query(
    `INSERT INTO product_images (product_id,url_imagen,es_principal)
     VALUES (?,?,?)`,
    [product_id, url_imagen, es_principal || 0]
  );

  res.status(201).json({ message: 'Imagen agregada' });
};
