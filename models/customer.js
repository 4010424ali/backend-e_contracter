const mongoose = require('mongoose');
const geocoder = require('../utils/geocoder');

const CustomerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please enter name'],
      trim: true,
      maxlength: [100, 'Name can not be more then 100 characters'],
    },
    description: {
      type: String,
      required: [true, 'Please enter description'],
      maxlength: [500, 'description can not more than 500 character'],
    },
    phone: {
      type: String,
      required: [true, 'Please enter phone for contact'],
      maxlength: [11, 'Phone number can not be more then 11 number'],
    },
    status: {
      type: Boolean,
      default: true,
    },
    role: {
      type: String,
      enum: ['plumber', 'designer', 'electricain', 'completeHouse'],
      required: [true, 'Please add role'],
    },
    architect: {
      type: Boolean,
      default: false,
    },
    totalSize: {
      type: Number,
    },
    pdfUrl: {
      type: String,
      default: 'no_url_pdf',
    },
    catUrl: {
      type: String,
      default: 'no_cat_file',
    },
    cost: {
      type: String,
      required: [true, 'Please enter cost'],
    },
    buidTime: {
      type: String,
      required: [true, 'Please add product delivery time'],
    },
    buildCustomeTeam: {
      type: Boolean,
      default: false,
    },
    address: {
      type: String,
      required: [true, 'Please add a address'],
    },
    location: {
      // GeoJSON Point
      type: {
        type: String,
        enum: ['Point'],
      },
      coordinates: {
        type: [Number],
        index: '2dsphere',
      },
      formattedAddress: String,
      street: String,
      city: String,
      state: String,
      zipcode: String,
      country: String,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: true,
    },
  }
  // {
  //   toJSON: { virtuals: true },
  //   toObject: { virtuals: true },
  // }
);

// // Geocode & create location field
CustomerSchema.pre('save', async function (next) {
  const loc = await geocoder.geocode(this.address);

  this.location = {
    type: 'Point',
    coordinates: [loc[0].longitude, loc[0].latitude],
    formattedAddress: loc[0].formattedAddress,
    street: loc[0].streetName,
    city: loc[0].city,
    state: loc[0].stateCode,
    zipcode: loc[0].zipcode,
    country: loc[0].countryCode,
  };

  // Do not save address in DB
  this.address = null;
});

// // Reverse populate with virtual
// CustomerSchema.virtual('perposals', {
//   ref: 'Perposal',
//   localField: '_id',
//   foreignField: 'customers',
//   justOne: false,
// });

module.exports = mongoose.model('Customer', CustomerSchema);
