import { HttpError } from '../helpers/HttpError.js';

export function validateBody(schema, { allowEmpty = false } = {}) {
  return (req, _res, next) => {
    if (!allowEmpty && Object.keys(req.body || {}).length === 0) {
      next(HttpError(400, 'Body must have at least one field'));
      return;
    }

    const { error, value } = schema.validate(req.body, {
      abortEarly: false,
      stripUnknown: true,
    });

    if (error) {
      next(HttpError(400, error.details.map(detail => detail.message).join('; ')));
      return;
    }

    req.body = value;
    next();
  };
}
