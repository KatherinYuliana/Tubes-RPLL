// app.js
const express = require('express');
const cors = require('cors');

const usersRoutes = require('./routes/users');
const productsRoutes = require('./routes/products');
const storeRoutes = require('./routes/store');
const contactRoutes = require('./routes/contact');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/users', usersRoutes);
app.use('/api/products', productsRoutes);
app.use('/api/store', storeRoutes);
app.use('/api/contact', contactRoutes);

module.exports = app;
