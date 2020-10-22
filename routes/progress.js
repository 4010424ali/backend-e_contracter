const express = require('express');
const router = express.Router();
const {
  getAllProgress,
  createProgress,
  getProgress,
  updateProgress,
  deleteProgress,
} = require('../controller/progress');
const { protect } = require('../middleware/auth');

router.use(protect);

router.route('/:customerId').get(getAllProgress).post(createProgress);
router
  .route('/r/:id')
  .get(getProgress)
  .put(updateProgress)
  .delete(deleteProgress);

module.exports = router;
