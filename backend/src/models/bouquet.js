import { DataTypes } from 'sequelize';
import { sequelize } from '../config/sequelize.js';

export const Bouquet = sequelize.define(
  'Bouquet',
  {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    category: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    favorite: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    photoURL: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: 'bouquets',
  }
);
