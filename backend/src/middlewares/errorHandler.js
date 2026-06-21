export function errorHandler(error, _req, res, _next) {
  const status = error.status || 500;
  const message = status === 500 ? 'Internal Server Error' : error.message;

  if (status === 500) {
    console.error(error);
  }

  res.status(status).json({ message });
}
