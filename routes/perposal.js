const exprees = require('express');
const router = exprees.Router();
const {
  getPerposales,
  getPerposal,
  createPerposal,
  updatePerposal,
  deletePerposal,
} = require('../controller/perposal');
const { protect } = require('../middleware/auth');

router.use(protect);

router.route('/:customerId').get(getPerposales).post(createPerposal);

router.route('/single/:id').get(getPerposal);

router.route('/:id').put(updatePerposal).delete(deletePerposal);

module.exports = router;
