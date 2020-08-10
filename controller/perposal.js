const Perposal = require('../models/Perposal');
const asyncHandler = require('../middleware/async');
const ErrorResponse = require('../utils/errorResponse');
const Team = require('../models/TeamBuilder');

// @desc      Get all Perospal
// @route     GET /api/v1/perposal/:customerId
// #access    Private
exports.getPerposales = asyncHandler(async (req, res, next) => {
  const perposales = await Perposal.find({
    customers: req.params.customerId,
  }).populate({
    path: 'perposals',
  });

  if (!perposales) {
    return next(
      new ErrorResponse(`Perposal is not found with ${req.params.id}`)
    );
  }

  res.status(200).json({
    success: true,
    count: perposales.length,
    data: perposales,
  });
});

// @desc      Get single Perospal
// @route     GET /api/v1/perposal/signle/:id
// #access    Private
exports.getPerposal = asyncHandler(async (req, res, next) => {
  const perposal = await Perposal.findById(req.params.id);

  const team = await Team.find({ perposalId: req.params.id });

  if (!perposal) {
    return next(
      new ErrorResponse(`Perposal is not found with ${req.params.id}`)
    );
  }

  res.status(200).json({
    success: true,
    data: {
      perposal,
      team,
    },
  });
});

// @desc      create Perospal
// @route     POST /api/v1/perposal/:customerId
// #access    Private
exports.createPerposal = asyncHandler(async (req, res, next) => {
  req.body.customers = req.params.customerId;
  req.body.user = req.user.id;

  const checkPerposal = await Perposal.findOne({ user: req.user.id });

  if (req.user.role === 'user') {
    return next(new ErrorResponse(`You can not post a job`, 400));
  }

  if (checkPerposal) {
    return next(new ErrorResponse(`You already make the perposal`, 400));
  }

  // Create the perposal
  const perposal = await Perposal.create(req.body);

  res.status(201).json({
    success: true,
    data: perposal,
  });
});

// @desc      update Perospal
// @route     PUT /api/v1/perposal/:id
// #access    Private
exports.updatePerposal = asyncHandler(async (req, res, next) => {
  let perposal = await Perposal.findById(req.params.id);

  if (!perposal) {
    return next(
      new ErrorResponse(`Perposal is not found with ${req.params.id}`)
    );
  }

  perposal = await Perposal.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    success: true,
    data: perposal,
  });
});

// @desc      delete Perospal
// @route     PUT /api/v1/perposal/:id
// #access    Private
exports.deletePerposal = asyncHandler(async (req, res, next) => {
  const perposal = await Perposal.findById(req.params.id);

  if (!perposal) {
    return next(
      new ErrorResponse(`Perposal is not found with ${req.params.id}`)
    );
  }

  await perposal.remove;

  res.status(200).json({
    success: true,
    data: { msg: 'Perposal is deleted' },
  });
});
