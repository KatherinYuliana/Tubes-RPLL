// models/Cart.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db'); // Sesuaikan path koneksi db

const Cart = sequelize.define('Cart', {
  id_cart: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  id_user: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  id_product: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 1
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
}, {
  tableName: 'cart',
  timestamps: false
});

module.exports = Cart;
