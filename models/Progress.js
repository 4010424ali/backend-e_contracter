const mongoose = require('mongoose');

const ProgressSchema = new mongoose.Schema(
  {
    taskname: {
      type: String,
      required: [true, 'Please add a take name'],
    },
    completePercentage: {
      type: Number,
      default: 0,
      min: 0,
      max: 100,
    },
    customer: {
      type: mongoose.Schema.ObjectId,
      ref: 'Customer',
      required: true,
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Progress', ProgressSchema);
