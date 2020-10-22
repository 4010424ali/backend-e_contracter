const asyncHnadler = require('../middleware/async');
const ErrorResponse = require('../utils/errorResponse');
const Progress = require('../models/Progress');
const Perposal = require('../models/Perposal');

// @desc      Get all the Progress
// @route     GET /api/v1/progress/:customerId
// @access    Private
exports.getAllProgress = asyncHnadler(async (req, res, next) => {
  const progress = await Progress.find({ customer: req.params.customerId });

  res.status(200).json({
    success: true,
    count: progress.length,
    data: progress,
  });
});

// @desc      Single Progress
// @route     GET /api/v1/progress/r/:id
// @access    Private
exports.getProgress = asyncHnadler(async (req, res, next) => {
  const progress = await Progress.findById(req.params.id);

  if (!progress) {
    return next(
      new ErrorResponse(`Progress is found with that ${req.params.id} id`, 404)
    );
  }

  res.status(200).json({
    success: true,
    data: progress,
  });
});

// @desc      Create the Progress
// @route     POST /api/v1/progress/:customerId
// @access    Private
exports.createProgress = asyncHnadler(async (req, res, next) => {
  req.body.customer = req.params.customerId;
  req.body.user = req.user.id;

  if (req.user.role === 'user') {
    return next(
      new ErrorResponse(`You are not authorized to complete the task`, 401)
    );
  }

  const checkPerposal = await Perposal.findOne({
    customers: req.params.customerId,
    accept: 'yes',
  });

  if (!checkPerposal) {
    return next(
      new ErrorResponse(
        'Perposal is not accept, wait for perposal then submit the progress',
        404
      )
    );
  }

  const progress = await Progress.create(req.body);

  res.status(201).json({
    success: true,
    data: progress,
  });
});

// @desc      Update Progress
// @route     PUT /api/v1/progress/r/:id
// @access    Private
exports.updateProgress = asyncHnadler(async (req, res, next) => {
  let progress = await Progress.findById(req.params.id);

  if (!progress) {
    return next(
      new ErrorResponse(`Progress is found with that ${req.params.id} id`, 404)
    );
  }

  if (req.user.role === 'user') {
    return next(new ErrorResponse(`Roesource not found`, 401));
  }

  progress = await Progress.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    success: true,
    data: progress,
  });
});

// @desc      Delete Progress
// @route     Delete /api/v1/progress/r/:id
// @access    Private
exports.deleteProgress = asyncHnadler(async (req, res, next) => {
  let progress = await Progress.findById(req.params.id);

  if (!progress) {
    return next(
      new ErrorResponse(`Progress is found with that ${req.params.id} id`, 404)
    );
  }

  await progress.remove();

  res.status(200).json({
    success: true,
    data: {},
  });
});
