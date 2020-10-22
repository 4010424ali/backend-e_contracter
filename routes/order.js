const express = require('express');
const router = express.Router();
const {
  getOrders,
  getMyOrder,
  getOrder,
  deleteOrder,
  pay,
  createOrder,
} = require('../controller/order');

const { protect } = require('../middleware/auth');

// Authenticate the routes
router.use(protect);

router.route('/:id/pay').put(pay);

router.route('/mine').get(getMyOrder);

router.route('/:id').get(getOrder).delete(deleteOrder);

router.route('/').get(getOrders).post(createOrder);

module.exports = router;
