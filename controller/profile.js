const asyncHandler = require('../middleware/async');
const ErrorResponse = require('../utils/errorResponse');
const Profile = require('../models/Profile');

// @desc      Get all Profile
// @route     GET /api/v1/profile
// #access    Public
exports.getProfiles = asyncHandler(async (req, res, next) => {
  const profile = await Profile.find();

  res.status(200).json({
    success: true,
    count: profile.length,
    data: profile,
  });
});

// @desc      Get single profile
// @route     GET /api/v1/pofile/:id
// #access    Public
exports.getProfile = asyncHandler(async (req, res, next) => {
  const profile = await Profile.findById(req.params.id);

  if (!profile) {
    return next(
      new ErrorResponse(
        `Customer not found with the ID of ${req.params.id}`,
        404
      )
    );
  }

  res.status(200).json({
    success: true,
    data: profile,
  });
});

// @desc      Create  Profile
// @route     POST /api/v1/pofile
// #access    Private
exports.createProfile = asyncHandler(async (req, res, next) => {
  const profile = await Profile.create(req.body);

  res.status(200).json({
    success: true,
    data: profile,
  });
});

// @desc      Update Profile
// @route     GET /api/v1/pofile/:id
// #access    Private
exports.updateProfile = asyncHandler(async (req, res, next) => {
  let profile = await Profile.findById(req.params.id);

  if (!profile) {
    return next(
      new ErrorResponse(
        `Customer not found with the ID of ${req.params.id}`,
        404
      )
    );
  }

  profile = await Profile.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    success: true,
    data: profile,
  });
});

// @desc      Delete Profile
// @route     DELTE /api/v1/pofile/:id
// #access    Private
exports.deleteProfile = asyncHandler(async (req, res, next) => {
  let profile = await Profile.findById(req.params.id);

  if (!profile) {
    return next(
      new ErrorResponse(
        `Customer not found with the ID of ${req.params.id}`,
        404
      )
    );
  }

  profile.remove();

  res.status(200).json({
    success: true,
    data: { msg: 'Profile deleted' },
  });
});

// @desc      Get all contracter
// @route     GET /api/v1/profile/p
// #access    Public
exports.getCon = asyncHandler(async (req, res, next) => {
  const contracter = await Profile.find({ JobRole: 'contracter' });

  res.status(200).json({ success: true, data: contracter });
});

// @desc      Get all Plumber
// @route     GET /api/v1/profile/plu
// #access    Public
exports.getPlumber = asyncHandler(async (req, res, next) => {
  const plumber = await Profile.find({ JobRole: 'plumber' });

  res.status(200).json({ success: true, data: plumber });
});

// @desc      Get all designer
// @route     GET /api/v1/profile/des
// #access    Public
exports.getDesigner = asyncHandler(async (req, res, next) => {
  const designer = await Profile.find({ JobRole: 'designer' });

  res.status(200).json({ success: true, data: designer });
});

// @desc      Get all electrician
// @route     GET /api/v1/profile/elect
// #access    Public
exports.getElectricain = asyncHandler(async (req, res, next) => {
  const electrician = await Profile.find({ JobRole: 'electrician' });

  res.status(200).json({ success: true, data: electrician });
});
