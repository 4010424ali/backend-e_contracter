const express = require('express');
const router = express.Router();
const {
  getReviews,
  getReview,
  addReview,
  updateReview,
  deleteReview,
} = require('../controller/review');
const { protect } = require('../middleware/auth');

router.route('/:perposalId').get(getReviews).post(protect, addReview);
router
  .route('/:id')
  .get(getReview)
  .put(protect, updateReview)
  .delete(protect, deleteReview);

module.exports = router;
