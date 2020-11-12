const ErrorResponse = require('../utils/errorResponse');
const asyncHandle = require('../middleware/async');
const Review = require('../models/Review');
const Perposal = require('../models/Perposal');

// @desc      Get reviews
// @route     GET /api/v1/reviews/:perposalId
// @access    Public
exports.getReviews = asyncHandle(async (req, res, next) => {
  const review = await Review.find({ perposal: req.params.perposalId });

  res.status(200).json({
    success: true,
    count: review.length,
    data: review,
  });
});

// @desc      Get reviews
// @route     GET /api/v1/reviews/:id
// @access    Public
exports.getReview = asyncHandle(async (req, res, next) => {
  const review = await Review.findById(req.params.id).populate({
    path: 'perposal',
  });

  if (!review) {
    return next(
      new ErrorResponse(`No review found with the id of ${req.params.id}`, 404)
    );
  }

  res.status(200).json({
    success: true,
    data: review,
  });
});

// @desc      Add review
// @route     POST /api/v1/reviews/:perposalId
// @access    Private
exports.addReview = asyncHandle(async (req, res, next) => {
  req.body.perposal = req.params.perposalId;
  req.body.user = req.user.id;

  const perposal = await Perposal.findById(req.params.perposalId);

  if (!perposal) {
    return next(
      new ErrorResponse(
        `No perposal with the id of ${req.params.bootcampId}`,
        404
      )
    );
  }

  const review = await Review.create(req.body);

  res.status(201).json({
    success: true,
    data: review,
  });
});

// @desc      Update review
// @route     PUT /api/v1/reviews/:id
// @access    Private
exports.updateReview = asyncHandle(async (req, res, next) => {
  let review = await Review.findById(req.params.id);

  if (!review) {
    return next(
      new ErrorResponse(`No review with the id of ${req.params.id}`, 404)
    );
  }

  // Make sure review belongs to user or user is admin
  if (review.user.toString() !== req.user.id) {
    return next(new ErrorResponse(`Not authorized to update review`, 401));
  }

  review = await Review.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  review.save();

  res.status(200).json({
    success: true,
    data: review,
  });
});

// @desc      Delete review
// @route     DELETE /api/v1/reviews/:id
// @access    Private
exports.deleteReview = asyncHandle(async (req, res, next) => {
  const review = await Review.findById(req.params.id);

  if (!review) {
    return next(
      new ErrorResponse(`No review with the id of ${req.params.id}`, 404)
    );
  }

  // Make sure review belongs to user or user is admin
  if (review.user.toString() !== req.user.id) {
    return next(new ErrorResponse(`Not authorized to update review`, 401));
  }

  await review.remove();

  res.status(200).json({
    success: true,
    data: {},
  });
});
