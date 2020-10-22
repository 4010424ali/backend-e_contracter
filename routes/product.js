const express = require('express');
const router = express.Router();

const {
  getProducts,
  getProduct,
  discountProduct,
  addReviews,
  searchProducts,
} = require('../controller/product');

//  Bring Auth middleware
const { protect } = require('../middleware/auth');

// Protect mean authenticate that routes
router.route('/:id/reviews').post(protect, addReviews);
router.route('/discount').get(discountProduct);
router.route('/search').get(searchProducts);
router.route('/').get(getProducts);
router.route('/:id').get(getProduct);

module.exports = router;
