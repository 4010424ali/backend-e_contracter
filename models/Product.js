const mongoose = require('mongoose');

// define the review schema
const reviewSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please add name of review'],
    },
    rating: {
      type: Number,
      default: 0,
    },
    comment: {
      type: String,
      required: [true, 'please add commit'],
    },
  },
  {
    timestamps: true,
  }
);
// define products db schemma
const prodctSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add product name'],
  },
  image: {
    type: String,
    // required: [true, 'Please add image'],
  },
  price: {
    type: Number,
    default: 0,
    required: [true, 'Please enter price'],
  },
  countInStock: {
    type: Number,
    default: 0,
    required: [true, 'Please enter stock'],
  },
  discount: {
    type: Boolean,
    default: false,
  },
  amountOfDiscount: {
    type: Number,
    default: 0,
  },
  discountPrice: {
    type: Number,
    default: 0,
  },
  realPrice: {
    type: Number,
  },
  description: {
    type: String,
    required: [true, 'Please enter decription'],
  },
  rating: {
    type: Number,
    default: 0,
    required: [true, 'Please enter a rating'],
  },
  numReviews: {
    type: Number,
    default: 0,
  },
  reviews: [reviewSchema],
});

// pre call bedore saving the data
prodctSchema.pre('save', async function (next) {
  console.log(this.price);

  // if the not discount the below code do no thing
  if (!this.discount) {
    // next make move on
    next();
  }

  // save price in real price field
  this.realPrice = this.price;

  // divide the amount of discount by 100
  const valueDecimal = this.amountOfDiscount / 100;

  // multiple the prices by value get bu divission
  const discountVslue = valueDecimal * this.price;

  // discounted value
  const value = this.price - discountVslue;

  // save discount value
  this.discountPrice = value;

  // update the value of price
  this.price = value;

  // save the data
  next();
});

module.exports = mongoose.model('Product', prodctSchema);
