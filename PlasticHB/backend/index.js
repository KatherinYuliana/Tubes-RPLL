// const express = require('express');
// const cors = require('cors');
// const app = express();
// const usersRoutes = require('./routes/users');
// const productsRoutes = require('./routes/products');
// const storeRoutes = require('./routes/store');
// const contactRoutes = require('./routes/contact');
// const cartRoutes = require('./routes/cart');
// const paymentRoutes = require('./routes/payment');
// const checkoutRoutes = require('./routes/checkout');
// const ordersRoutes = require('./routes/orders');

// app.use(cors());
// app.use(express.json());

// app.use('/api/users', usersRoutes);
// app.use('/api/products', productsRoutes);
// app.use('/api/store', storeRoutes);
// app.use('/api/contact', contactRoutes);
// app.use('/api/cart', cartRoutes);
// app.use('/api/payment', paymentRoutes);
// app.use('/api/checkout', checkoutRoutes);
// app.use('/api/orders', ordersRoutes);

// app.listen(3000, () => {
//   console.log('Server berjalan di http://localhost:3000');
// });

// index.js
const app = require('./app');

app.listen(3000, () => {
  console.log('Server berjalan di http://localhost:3000');
});
