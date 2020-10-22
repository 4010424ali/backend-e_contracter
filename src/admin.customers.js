const AdminBro = require('admin-bro');
const Customer = require('../models/customer');

const options = {
  listProperties: [
    'name',
    'description',
    'phone',
    'status',
    'role',
    'totalSize',
    'cost',
    'buidTime',
    'location.formattedAddress',
  ],
  parent: {
    name: 'Customers',
    icon: 'far fa-user',
  },
  properties: {
    description: {
      type: 'richtext',
    },
    _id: {
      isVisible: { list: false, filter: false, show: true, edit: false },
    },
    pdfUrl: {
      isVisible: { list: false, filter: false, show: true, edit: false },
      label: 'PDF FIle',
    },
    catUrl: {
      isVisible: { list: false, filter: false, show: true, edit: false },
      label: 'AutoCat FIle',
    },
    createdAt: {
      isVisible: { list: false, filter: false, show: true, edit: false },
    },
    coordinates: {
      isVisible: { list: false, filter: false, show: true, edit: false },
    },
  },
};

module.exports = {
  resource: Customer,
  options,
};
