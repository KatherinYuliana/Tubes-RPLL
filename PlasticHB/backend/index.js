const express = require('express');
const cors = require('cors');
const app = express();
const usersRoutes = require('./routes/users');
const productsRoutes = require('./routes/products');

app.use(cors());
app.use(express.json());

app.use('/api/users', usersRoutes);
app.use('/api/products', productsRoutes);

app.listen(3000, () => {
  console.log('Server berjalan di http://localhost:3000');
});