const Team = require('../models/TeamBuilder');
const asyncHandler = require('../middleware/async');
const ErrorResponse = require('../utils/errorResponse');

// @desc      Get all team
// @route     GET /api/v1/team/:perposalId
// #access    Private
exports.getTeam = asyncHandler(async (req, res, next) => {
  const team = await Team.find({
    perposalId: req.params.perposalId,
  }).populate({
    path: 'perposalId',
  });

  if (!team) {
    return next(new ErrorResponse(`Team is not found with ${req.params.id}`));
  }

  res.status(200).json({
    success: true,
    count: team.length,
    data: team,
  });
});

// @desc      Get single team
// @route     GET /api/v1/team/single/:id
// #access    Private
exports.getSingleTeam = asyncHandler(async (req, res, next) => {
  const team = await Team.findById(req.params.id);

  if (!team) {
    return next(new ErrorResponse(`team is not found with ${req.params.id}`));
  }

  res.status(200).json({
    success: true,
    data: team,
  });
});

// @desc      create Team
// @route     POST /api/v1/team/:perposalId
// #access    Private
exports.createTeam = asyncHandler(async (req, res, next) => {
  req.body.perposalId = req.params.perposalId;

  // Create the perposal
  const perposal = await Team.create(req.body);

  res.status(201).json({
    success: true,
    data: perposal,
  });
});

// @desc      update team
// @route     PUT /api/v1/team/:id
// #access    Private
exports.updateTeam = asyncHandler(async (req, res, next) => {
  let team = await Team.findById(req.params.id);

  if (!team) {
    return next(new ErrorResponse(`team is not found with ${req.params.id}`));
  }

  team = await Team.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    success: true,
    data: team,
  });
});

// @desc      delete Team
// @route     PUT /api/v1/team/:id
// #access    Private
exports.deleteTeam = asyncHandler(async (req, res, next) => {
  const team = await Team.findById(req.params.id);

  if (!team) {
    return next(
      new ErrorResponse(`Perposal is not found with ${req.params.id}`)
    );
  }

  await team.remove();

  res.status(200).json({
    success: true,
    data: { msg: 'Team is deleted' },
  });
});
