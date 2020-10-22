const mongoose = require('mongoose');
const opencage = require('opencage-api-client');

const ShopSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add a name'],
  },
  description: {
    type: String,
    required: [true, 'Please add a description'],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  address: {
    type: String,
    required: [true, 'Please enter a address'],
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
    city: String,
    state: String,
    zipcode: String,
    country: String,
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true,
  },
});

// Geocode & create location field
ShopSchema.pre('save', async function (next) {
  const loc = await opencage.geocode({ q: this.address });

  this.location = {
    type: 'Point',
    coordinates: [loc.results[0].geometry.lat, loc.results[0].geometry.lng],
    formattedAddress: loc.results[0].formatted,
    city: loc.results[0].components.city,
    state: loc.results[0].components.state,
    zipcode: loc.results[0].components.postcode,
    country: loc.results[0].components.country,
  };

  // Do not save address in DB
  this.address = null;
});

module.exports = mongoose.model('Shop', ShopSchema);
