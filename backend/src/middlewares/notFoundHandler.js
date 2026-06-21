import { HttpError } from '../helpers/HttpError.js';

export function notFoundHandler(_req, _res, next) {
  next(HttpError(404, 'Not found'));
}
