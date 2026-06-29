import Joi from 'joi';

export const createOrderSchema = Joi.object({
  customerName: Joi.string().trim().min(2).max(100).required(),
  customerPhone: Joi.string().trim().min(5).max(30).required(),
  customerEmail: Joi.string().trim().email().max(150).required(),
  customerMessage: Joi.string().trim().max(1000).allow('', null),
  bouquetTitle: Joi.string().trim().max(100).allow('', null),
  bouquetPrice: Joi.number().positive().precision(2).allow(null),
  quantity: Joi.number().integer().min(1).max(99).default(1),
});
