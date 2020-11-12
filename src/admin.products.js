const Product = require('../models/Product');
const uploadFeature = require('@admin-bro/upload');
const path = require('path');

const options = {
  properties: {
    description: {
      // Make the text formatter editors
      type: 'richtext',
    },
    discountPrice: {
      // hide the discount properties propertry
      isVisible: {
        list: false,
        filter: false,
        show: true,
        edit: false,
        new: false,
      },
    },
    mimeType: {
      isVisible: false,
    },
    realPrice: {
      // Hide the real price properties
      isVisible: {
        list: false,
        filter: false,
        show: true,
        edit: false,
        new: false,
      },
    },
  },
};

module.exports = {
  resource: Product,
  // features: [
  //   // upload the image fature
  //   uploadFeature({
  //     provider: { local: { bucket: path.join(__dirname, '../public') } },
  //     properties: {
  //       key: 'image',
  //       mimeType: 'mimeType',
  //     },
  //   }),
  // ],
  options,
};
