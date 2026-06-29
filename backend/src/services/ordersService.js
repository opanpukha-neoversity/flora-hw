import { Order } from '../models/index.js';

function serializeOrder(order) {
  const plain = order.toJSON ? order.toJSON() : order;
  return {
    ...plain,
    bouquetPrice: plain.bouquetPrice === null ? null : Number(plain.bouquetPrice),
  };
}

export async function listOrders() {
  const orders = await Order.findAll({ order: [['id', 'DESC']] });
  return orders.map(serializeOrder);
}

export async function getOrderById(id) {
  const order = await Order.findByPk(id);
  return order ? serializeOrder(order) : null;
}

export async function createOrder(data) {
  const order = await Order.create({
    ...data,
    customerMessage: data.customerMessage || null,
    bouquetTitle: data.bouquetTitle || null,
    bouquetPrice: data.bouquetPrice ?? null,
    quantity: data.quantity || 1,
  });

  return serializeOrder(order);
}
