const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({
  nikename: {
    type: String,
    required: [true, 'Please enter the nickname'],
  },
  shortDescription: {
    type: String,
    required: [true, 'Please enter short descri[tion'],
  },
  JobRole: {
    type: String,
    enum: ['contracter', 'designer', 'plumber', 'electrician'],
    lowercase: true,
  },
  longDescription: {
    type: String,
  },
  phone: {
    type: String,
    required: [true, 'Please enter the phone'],
    maxlength: [15, 'Phone number can not be more then 15'],
  },
  age: {
    type: String,
    required: [true, 'Please enter the age'],
  },
  experience: {
    type: String,
    required: [true, 'Please enter experience'],
  },
  education: {
    type: String,
    required: [true, 'Give some info about your education'],
  },
  address: {
    type: String,
    required: [true, 'Please add a address'],
  },
  created: {
    type: Date,
    default: Date.now,
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true,
  },
});

module.exports = mongoose.model('Profile', ProfileSchema);
