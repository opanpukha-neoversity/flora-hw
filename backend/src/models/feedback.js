import { DataTypes } from 'sequelize';
import { sequelize } from '../config/sequelize.js';

export const Feedback = sequelize.define(
  'Feedback',
  {
    author: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    text: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    tableName: 'feedbacks',
  }
);
