const asyncHandler = require('../middleware/async');
const ErrorResponse = require('../utils/errorResponse');
const Product = require('../models/Product');

// @desc     Get All Products
// @route    GET /api/v1/products
// @access   Public
exports.getProducts = asyncHandler(async (req, res, next) => {
  // check the category
  const category = req.query.category ? { category: req.query.category } : {};
  // Check the search keyboard type
  const searchKeyword = req.query.searchKeyword
    ? {
        name: {
          $regex: req.query.searchKeyword,
          $options: 'i',
        },
      }
    : {};
  // Sort the Products
  const sortOrder = req.query.sortOrder
    ? req.query.sortOrder === 'lowest'
      ? { price: 1 }
      : { price: -1 }
    : { _id: -1 };
  // find the products
  const products = await Product.find({
    ...category,
    ...searchKeyword,
    discount: false,
  }).sort(sortOrder);

  // send the response on frontend
  res.status(200).json({ products });
});

// @desc     Get All Products
// @route    GET /api/v1/products/search
// @access   Public
exports.searchProducts = asyncHandler(async (req, res, next) => {
  // check the category
  const category = req.query.category ? { category: req.query.category } : {};
  // Check the search keyboard type
  const searchKeyword = req.query.searchKeyword
    ? {
        name: {
          $regex: req.query.searchKeyword,
          $options: 'i',
        },
      }
    : {};
  // Sort the Products
  const sortOrder = req.query.sortOrder
    ? req.query.sortOrder === 'lowest'
      ? { price: 1 }
      : { price: -1 }
    : { _id: -1 };
  // find the products
  const products = await Product.find({
    ...category,
    ...searchKeyword,
  }).sort(sortOrder);

  // send the response on frontend
  res.status(200).json({ products });
});

// @desc     Single products
// @route    GET /api/v1/products/:id
// @access   Public
exports.getProduct = asyncHandler(async (req, res, next) => {
  // find products by its id given nin the usrl
  const product = await Product.findById(req.params.id);

  // if products not found then send the error
  if (!product) {
    return next(
      new ErrorResponse(`Product is not found with ${req.params.id}`, 404)
    );
  }

  // send the respone
  res.status(200).json({ product });
});

// @desc     Discount products
// @route    GET /api/v1/products/discount
// @access   Public
exports.discountProduct = asyncHandler(async (req, res, next) => {
  // find the discounted products
  const products = await Product.find({ discount: true });

  res.status(200).json({ products });
});

// @desc     Add Reviews of Products=
// @route    POST /api/v1/products/:id/reviews
// @access   Private
exports.addReviews = asyncHandler(async (req, res, next) => {
  // find products by its id given nin the usrl
  const product = await Product.findById(req.params.id);

  if (!product) {
    return next(
      new ErrorResponse(`Product not fount with ${req.params.id}`, 404)
    );
  }

  // take the review data
  const review = {
    name: req.body.name,
    rating: Number(req.body.rating),
    comment: req.body.comment,
  };
  // push the review data
  product.reviews.push(review);

  // add number of review
  product.numReviews = product.reviews.length;

  // apply rating formula and dave
  product.rating =
    product.reviews.reduce((a, c) => c.rating + a, 0) / product.reviews.length;
  // save the review into products
  const updatedProduct = await product.save();

  // send the response
  res.status(201).send({
    data: updatedProduct.reviews[updatedProduct.reviews.length - 1],
    message: 'Review saved successfully.',
  });
});
