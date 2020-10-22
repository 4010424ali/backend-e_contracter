const opencage = require('opencage-api-client');
const asyncHandler = require('../middleware/async');
const ErrorResponse = require('../utils/errorResponse');
const Shop = require('../models/Shop');

// @desc      Get all Shop
// @route     GET /api/v1/shopes
// @access    Public
exports.getShopes = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedResults);
});

// @desc      Get single Shop
// @route     GET /api/v1/shopes/:id
// @access    Public
exports.getShope = asyncHandler(async (req, res, next) => {
  const shop = await Shop.findById(req.params.id);

  if (!shop) {
    return next(
      new ErrorResponse(`Shop not found with the ID of ${req.params.id}`, 404)
    );
  }

  res.status(200).json({
    success: true,
    data: shop,
  });
});

// @desc      Create Shop
// @route     POST /api/v1/shopes
// @access    Private
exports.createShop = asyncHandler(async (req, res, next) => {
  req.body.user = req.user.id;

  const shop = await Shop.create(req.body);

  res.status(201).json({
    success: true,
    data: shop,
  });
});

// @desc      Update the shoe
// @route     PUT /api/v1/shop/:id
// @access    Private
exports.updateShop = asyncHandler(async (req, res, next) => {
  let shop = await Shop.findById(req.params.id);

  if (!shop) {
    return next(
      new ErrorResponse(`Shop not found with the ID of ${req.params.id}`, 404)
    );
  }

  shop = await Shop.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    success: true,
    data: shop,
  });
});

// @desc      Delete the shop
// @route     DDELETE /api/v1/shop/:id
// @access    Private
exports.deleteShop = asyncHandler(async (req, res, next) => {
  const shop = await Shop.findById(req.params.id);

  if (!shop) {
    return next(
      new ErrorResponse(`Shop not found with the ID of ${req.params.id}`, 404)
    );
  }

  await shop.remove();

  res.status(200).json({
    success: true,
    data: {},
  });
});
