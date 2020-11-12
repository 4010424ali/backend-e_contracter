const exprees = require('express');
const router = exprees.Router();
const {
  getPerposales,
  getPerposal,
  createPerposal,
  updatePerposal,
  deletePerposal,
  acceptPerposal,
  getActiveProjectWithPerposal,
  getCloseProjectWithPerposal,
  getAllPerposal,
} = require('../controller/perposal');

// bring the model file;
const Perposal = require('../models/Perposal');

// middleware files
const { protect } = require('../middleware/auth');
const advancedResults = require('../middleware/advancedResults');

router.use(protect);

router.route('/close').get(getCloseProjectWithPerposal);

router.route('/active').get(getActiveProjectWithPerposal);

router.route('/accept/:id').get(acceptPerposal);

router.route('/:customerId').get(getPerposales).post(createPerposal);

router.route('/single/:id').get(getPerposal);

router.route('/:id').put(updatePerposal).delete(deletePerposal);

router.route('/').get(advancedResults(Perposal, 'user'), getAllPerposal);

module.exports = router;
