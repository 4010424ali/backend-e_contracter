const mongoose = require('mongoose');

const PerposalSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please enter title'],
    maxlength: [100, 'title can not be more then 100 character'],
  },
  description: {
    type: String,
    required: [true, 'Please add the description'],
    maxlength: [500, 'description can not be more then 500 character'],
  },
  status: {
    type: Boolean,
    default: true,
    required: [true, 'Please add the status'],
  },
  maxPrice: {
    type: String,
    required: [true, 'Please add Maximum prices'],
  },
  minPrice: {
    type: String,
    required: [true, 'Please add minimum price'],
  },
  totalTeamMemeber: {
    type: Number,
    required: [true, 'Please add Total Team Memeber'],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  customers: {
    type: mongoose.Schema.ObjectId,
    ref: 'Customer',
    required: true,
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true,
  },
});

// Reverse populate with virtual
PerposalSchema.virtual('team', {
  ref: 'Team',
  localField: '_id',
  foreignField: 'perposalId',
  justOne: false,
});

module.exports = mongoose.model('Perposal', PerposalSchema);
