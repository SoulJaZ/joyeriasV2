const express = require('express');
const cors = require('cors') 
require("dotenv").config();


const app = express();

app.use(cors({
  origin: "http://localhost:5173",
}));

app.use(express.json());

app.use('/api/v1/auth', require('./routes/auth.routes'));
app.use('/api/v1/cart', require('./routes/cart.routes'));
app.use('/api/v1/orders', require('./routes/orders.routes'));
app.use('/api/v1/products', require('./routes/products.routes'));
app.use('/api/v1/categories', require('./routes/category.routes'));
app.use('/api/v1/payments', require('./routes/payments.routes'));
app.use('/api/v1/invoices', require('./routes/invoices.routes'));




module.exports = app;