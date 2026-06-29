import Joi from 'joi';

export const createFeedbackSchema = Joi.object({
  author: Joi.string().trim().min(2).max(100).required(),
  text: Joi.string().trim().min(5).max(1000).required(),
});
