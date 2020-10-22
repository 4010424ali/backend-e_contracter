const asyncHandler = require('../middleware/async');
const ErrorResponse = require('../utils/errorResponse');
const Order = require('../models/Order');

// @desc      Get all order
// @route     GET /api/v1/orders
// @access    Private
exports.getOrders = asyncHandler(async (req, res, next) => {
  const orders = await Order.find({}).populate('user');

  res.status(200).json(orders);
});

// @desc      Get my Order
// @route     GET /api/v1/orders/mine
// @access    Private
exports.getMyOrder = asyncHandler(async (req, res, next) => {
  const orders = await Order.find({ user: req.user._id });

  if (!orders.length === 0) {
    return next(
      new ErrorResponse(`Order is not found with ${req.user._id}`, 404)
    );
  }

  res.status(200).json({ orders });
});

// @desc      Get single Order
// @route     GET /api/v1/orders/:id
// @access    Private
exports.getOrder = asyncHandler(async (req, res, next) => {
  const order = await Order.findById(req.params.id);

  if (!order) {
    return next(
      new ErrorResponse(`Order is not found with ${req.params.id}`, 404)
    );
  }

  res.status(200).json({ order });
});

// @desc      Delete Order
// @route     DELETE /api/v1/orders/:id
// @access    Private
exports.deleteOrder = asyncHandler(async (req, res, next) => {
  const order = await Order.findOne({ _id: req.params.id });

  if (!order) {
    return next(
      new ErrorResponse(`Order is not found with ${req.params.id}`, 404)
    );
  }

  const deletedOrder = await order.remove();

  res.status(200).json({ deleteOrder: deletedOrder });
});

// @desc      Create Order
// @route     POST /api/v1/orders/
// @access    Private
exports.createOrder = asyncHandler(async (req, res, next) => {
  const newOrder = new Order({
    orderItems: req.body.orderItems,
    user: req.user._id,
    shipping: req.body.shipping,
    payment: req.body.payment,
    itemsPrice: req.body.itemsPrice,
    taxPrice: req.body.taxPrice,
    shippingPrice: req.body.shippingPrice,
    totalPrice: req.body.totalPrice,
  });
  const newOrderCreated = await newOrder.save();
  res.status(201).send({ message: 'New Order Created', data: newOrderCreated });
});

// @desc      Pay Order
// @route     PUT /api/v1/orders/:id/pay
// @access    Private
exports.pay = asyncHandler(async (req, res, next) => {
  const order = await Order.findById(req.params.id);

  if (!order) {
    return next(
      new ErrorResponse(`Order is not found with ${req.params.id}`, 404)
    );
  }

  order.isPaid = true;
  order.paidAt = Date.now();
  order.payment = {
    paymentMethod: 'paypal',
    paymentResult: {
      payerID: req.body.payerID,
      orderID: req.body.orderID,
      paymentID: req.body.paymentID,
    },
  };

  const updatedOrder = await order.save();
  res.send({ message: 'Order Paid.', order: updatedOrder });
});
