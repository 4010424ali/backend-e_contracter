const mongoose = require('mongoose');

const TeamBuilderSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please enter the name'],
    maxlength: [30, 'Name can not be more than 30'],
  },
  experience: {
    type: Number,
    required: [true, 'Please enter the experience'],
  },
  bio: {
    type: String,
    required: [true, 'Please add bio'],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  perposalId: {
    type: mongoose.Schema.ObjectId,
    ref: 'Perposal',
    required: true,
  },
});

module.exports = mongoose.model('Team', TeamBuilderSchema, 'teams');
