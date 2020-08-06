const express = require('express');
const router = express.Router();

const {
  getCustomers,
  createCutomer,
  getCustomer,
  updateCutomer,
  deleteCustomer,
  getCustomerInRadius
} = require('../controller/customer');

router.route('/').get(getCustomers).post(createCutomer);

router.route('/:id').get(getCustomer).put(updateCutomer).delete(deleteCustomer);

router.route('/radius/:zipcode/:distance').get(getCustomerInRadius);

module.exports = router;
