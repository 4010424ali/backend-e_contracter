const mongoose = require('mongoose');
const slugify = require('slugify');

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
    enum: ['contracter', 'designer', 'plumber', 'user'],
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

// Create bootcamp slug from the name
ProfileSchema.pre('save', function (next) {
  this.nikename = slugify(this.nikename, { lower: true });
  next();
});

module.exports = mongoose.model('Profile', ProfileSchema);
