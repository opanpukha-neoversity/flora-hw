import Joi from 'joi';

const title = Joi.string().trim().min(2).max(100);
const description = Joi.string().trim().min(5).max(1000);
const price = Joi.number().positive().precision(2);
const category = Joi.string().trim().max(50).allow(null, '');
const favorite = Joi.boolean();
const photoURL = Joi.string().uri();

export const createBouquetSchema = Joi.object({
  title: title.required(),
  description: description.required(),
  price: price.required(),
  category,
  favorite,
});

export const updateBouquetSchema = Joi.object({
  title,
  description,
  price,
  category,
  favorite,
  photoURL,
}).min(1);

export const updateFavoriteSchema = Joi.object({
  favorite: favorite.required(),
});
