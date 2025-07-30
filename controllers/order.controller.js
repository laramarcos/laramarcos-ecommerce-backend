const Order = require('../models/order.model');

exports.createOrder = async (req, res) => {
  try {
    const { items, total } = req.body;
    const userId = req.user.id; // asumimos que el middleware auth ya agrega req.user

    if (!items || items.length === 0) {
      return res.status(400).json({ message: 'La orden no puede estar vacía' });
    }

    const newOrder = await Order.create({
      user: userId,
      items,
      total
    });

    // Luego de crear la orden, obtener todas las órdenes para el log
    const allOrders = await Order.find().populate('user').populate('items.product');

    res.status(201).json({
      message: 'Orden creada exitosamente',
      order: newOrder,
      allOrders // para que el frontend pueda mostrar en consola
    });
  } catch (error) {
    res.status(500).json({ message: 'Error al crear la orden', error });
  }
};

exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate('user').populate('items.product');
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener órdenes', error });
  }
};
