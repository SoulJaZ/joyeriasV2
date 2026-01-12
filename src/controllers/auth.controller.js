const bcrypt = require("bcryptjs");
const db = require("../config/db");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
  if (!req.body) {
    return res.status(400).json({ message: "Body requerido" });
  }

  const { nombre, email, password, telefono } = req.body;

  if (!nombre || !email || !password) {
    return res.status(400).json({ message: "Campos obligatorios faltantes" });
  }

  // 1️⃣ Verificar si el email ya existe
  const [[exists]] = await db.query("SELECT id FROM users WHERE email = ?", [
    email,
  ]);

  if (exists) {
    return res.status(409).json({
      message: "El correo ya está registrado",
    });
  }

  const hash = await bcrypt.hash(password, 10);

  await db.query(
    `INSERT INTO users (nombre, email, password, telefono, role_id)
    VALUES (?, ?, ?, ?, 2)`,
    [nombre, email, hash, telefono]
  );

  res.status(201).json({ message: "Usuario registrado exitosamente" });
  console.log(req.body);
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Email y contraseña requeridos",
      });
    }

    const [users] = await db.query(
      'SELECT * FROM users WHERE email = ? AND estado = "activo"',
      [email]
    );

    if (!users.length) {
      return res.status(401).json({ message: "Credenciales inválidas." });
    }

    const user = users[0];
    const valid = await bcrypt.compare(password, user.password);

    if (!valid) {
      return res.status(401).json({ message: "Credenciales inválidas." });
    }
    console.log('JWT_SECRET:', process.env.JWT_SECRET);

    const token = jwt.sign(
      {
        id: user.id,
        role_id: user.role_id,
      },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES }
    );

    res.json({
      token,
      user: {
        id: user.id,
        nombre: user.nombre,
        role_id: user.role_id,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al iniciar sesión" });
  }
};
