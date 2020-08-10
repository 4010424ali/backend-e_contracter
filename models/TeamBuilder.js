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
  perposals: {
    type: mongoose.Schema.ObjectId,
    ref: 'Perposal',
    required: true,
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true,
  },
});

module.exports = mongoose.model('Team', TeamBuilderSchema, 'teams');
