const exprees = require('express');
const router = exprees.Router();
const {
  getTeam,
  getSingleTeam,
  createTeam,
  updateTeam,
  deleteTeam,
} = require('../controller/teambuilder');

router.route('/:perposalId').get(getTeam).post(createTeam);

router.route('/single/:id').get(getSingleTeam);

router.route('/:id').put(updateTeam).delete(deleteTeam);

module.exports = router;
