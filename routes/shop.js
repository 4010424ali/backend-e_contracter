const express = require('express');
const router = express.Router();
const Shop = require('../models/Shop');
const { protect } = require('../middleware/auth');
const advancedResults = require('../middleware/advancedResults');

const {
  getShopes,
  createShop,
  getShope,
  updateShop,
  deleteShop,
} = require('../controller/shop');

router
  .route('/')
  .get(advancedResults(Shop), getShopes)
  .post(protect, createShop);

router
  .route('/:id')
  .get(getShope)
  .put(protect, updateShop)
  .delete(protect, deleteShop);

module.exports = router;
