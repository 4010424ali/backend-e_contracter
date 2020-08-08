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
} = require('../controller/profile');

router.route('/des').get(getDesigner);

router.route('/plu').get(getPlumber);

router.route('/e').get(getElectricain);

router.route('/p').get(getCon);

router.route('/').get(getProfiles).post(createProfile);

router.route('/:id').get(getProfile).put(updateProfile).delete(deleteProfile); //

module.exports = router;
