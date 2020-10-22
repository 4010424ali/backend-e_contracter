const express = require('express');
const router = express.Router();

const {
  getCustomers,
  createCutomer,
  getCustomer,
  updateCutomer,
  deleteCustomer,
  getCustomerInRadius,
  uploadPdf,
  uploadCad,
} = require('../controller/customer');

// Middleware
const advancedResults = require('../middleware/advancedResults');
const { protect } = require('../middleware/auth');

const Customer = require('../models/customer');

router
  .route('/')
  .get(advancedResults(Customer), getCustomers)
  .post(protect, createCutomer);

router
  .route('/:id')
  .get(getCustomer)
  .put(protect, updateCutomer)
  .delete(protect, deleteCustomer);

router.put('/:id/pdf', protect, uploadPdf);
router.put('/:id/cad', protect, uploadCad);

router.route('/radius/:zipcode/:distance').get(protect, getCustomerInRadius);

module.exports = router;
