const Perposal = require('../models/Perposal');
const asyncHandler = require('../middleware/async');
const ErrorResponse = require('../utils/errorResponse');
const Team = require('../models/TeamBuilder');

// @desc      Get all Perposla
// @route     Get /api/v1/perposal
// @access    Private
exports.getAllPerposal = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedResults);
});

// @desc      Get all Perposal with id
// @route     GET /api/v1/perposal/:customerId
// #access    Public
exports.getPerposales = asyncHandler(async (req, res, next) => {
  let perposales;
  console.log(req.user.role);
  if (req.user.role === 'user') {
    perposales = await Perposal.find({
      customers: req.params.customerId,
    }).populate({
      path: 'user',
      select: 'name image',
    });
  } else {
    perposales = await Perposal.find({
      user: req.user.id,
      customers: req.params.customerId,
    }).populate({
      path: 'user',
      select: 'name image',
    });
  }

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
// #access    Public
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

  const checkPerposal = await Perposal.findOne({
    user: req.user.id,
    customers: req.params.customerId,
  });

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

  if (req.user.role === 'user') {
    return next(new ErrorResponse(`You are not authorized person`, 404));
  }

  perposal = await Perposal.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  }).populate({
    path: 'user',
    select: 'name imageUrl',
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

  if (req.user.role === 'user') {
    return next(new ErrorResponse(`You are not authorized person`, 404));
  }

  await perposal.remove();

  res.status(200).json({
    success: true,
    data: { msg: 'Perposal is deleted' },
  });
});

// @desc      Accept Perospal
// @route     GET /api/v1/perposal/accept/:id
// #access    Private
exports.acceptPerposal = asyncHandler(async (req, res, next) => {
  let perposal = await Perposal.findById(req.params.id);

  if (!perposal) {
    return next(
      new ErrorResponse(`Perposal is not found with ${req.params.customerId}`)
    );
  }

  if (req.user.role !== 'user') {
    return next(new ErrorResponse('Resource not found wuth this role', 401));
  }

  // updating the value
  if (perposal.accept === 'yes') {
    perposal.accept = 'no';
  } else {
    perposal.accept = 'yes';
  }

  // saving value into darabase
  await perposal.save();

  // Getting the fresh value from database
  perposal = await Perposal.findById(req.params.id).populate({
    path: 'user',
    select: 'name imageUrl',
  });

  res.status(200).json({
    success: true,
    data: perposal,
  });
});

// @desc      Active Project
// @route     GET /api/v1/perposal/active
// #access    Private
exports.getActiveProjectWithPerposal = asyncHandler(async (req, res, next) => {
  const perposals = await Perposal.find({
    status: true,
    user: req.user.id,
    accept: 'yes',
  }).populate({
    path: 'customers',
  });

  res.status(200).json({
    success: true,
    data: perposals,
  });
});

// @desc      Close Project
// @route     GET /api/v1/perposal/close
// #access    Private
exports.getCloseProjectWithPerposal = asyncHandler(async (req, res, next) => {
  const closePerposals = await Perposal.find({
    status: false,
    user: req.user.id,
    accept: 'no',
  }).populate({
    path: 'customers',
  });

  res.status(200).json({
    success: true,
    data: closePerposals,
  });
});
