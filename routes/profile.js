const express = require('express');
const router = express.Router();

const {
  getProfiles,
  getProfile,
  updateProfile,
  deleteProfile,
  createProfile,
  getCon,
  getPlumber,
  getDesigner,
  getElectricain,
  getCurrentUserPtofile,
} = require('../controller/profile');

const { protect } = require('../middleware/auth');

router.route('/current').get(protect, getCurrentUserPtofile);

router.route('/des').get(getDesigner);

router.route('/plu').get(getPlumber);

router.route('/e').get(getElectricain);

router.route('/p').get(getCon);

router.route('/').get(getProfiles).post(protect, createProfile);

router
  .route('/:id')
  .get(getProfile)
  .put(protect, updateProfile)
  .delete(protect, deleteProfile);

module.exports = router;
