import { HttpError } from '../helpers/HttpError.js';
import * as ordersService from '../services/ordersService.js';

function ensureFound(order) {
  if (!order) {
    throw HttpError(404, 'Not found');
  }
  return order;
}

export async function getOrders(_req, res, next) {
  try {
    const orders = await ordersService.listOrders();
    res.status(200).json(orders);
  } catch (error) {
    next(error);
  }
}

export async function getOrder(req, res, next) {
  try {
    const order = ensureFound(await ordersService.getOrderById(req.params.id));
    res.status(200).json(order);
  } catch (error) {
    next(error);
  }
}

export async function addOrder(req, res, next) {
  try {
    const order = await ordersService.createOrder(req.body);
    res.status(201).json(order);
  } catch (error) {
    next(error);
  }
}
