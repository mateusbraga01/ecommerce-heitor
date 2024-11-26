const { Order, OrderItem, Product } = require('../models');
const sequelize = require('../config/database');

exports.createOrder = async (req, res) => {
  const t = await sequelize.transaction();
  
  try {
    const { items } = req.body;
    let total = 0;

    for (const item of items) {
      const product = await Product.findByPk(item.productId);
      if (!product || product.stock < item.quantity) {
        throw new Error(`Quantidade insuficiente de produto no estoque ${product.name}`);
      }
      total += product.price * item.quantity;
    }

    const order = await Order.create({
      userId: req.user.id,
      total
    }, { transaction: t });

    for (const item of items) {
      const product = await Product.findByPk(item.productId);
      await OrderItem.create({
        orderId: order.id,
        productId: item.productId,
        quantity: item.quantity,
        price: product.price
      }, { transaction: t });

      await product.update({
        stock: product.stock - item.quantity
      }, { transaction: t });
    }

    await t.commit();
    res.status(201).json(order);
  } catch (error) {
    await t.rollback();
    res.status(400).json({ error: error.message });
  }
};

exports.getUserOrders = async (req, res) => {
  try {
    const orders = await Order.findAll({
      where: { userId: req.user.id },
      include: [{
        model: Product,
        through: { attributes: ['quantity', 'price'] }
      }]
    });
    res.json(orders);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.updateOrderStatus = async (req, res) => {
  try {
    const order = await Order.findByPk(req.params.id);
    if (!order) {
      return res.status(404).json({ error: 'Pedido não encontrado' });
    }
    await order.update({ status: req.body.status });
    res.json(order);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};