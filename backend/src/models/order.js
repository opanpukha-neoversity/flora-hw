import { DataTypes } from 'sequelize';
import { sequelize } from '../config/sequelize.js';

export const Order = sequelize.define(
  'Order',
  {
    customerName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    customerPhone: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    customerEmail: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    customerMessage: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    bouquetTitle: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    bouquetPrice: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
    },
  },
  {
    tableName: 'orders',
  }
);
