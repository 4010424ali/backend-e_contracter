const AdminBro = require('admin-bro');
const AdminBroMongoose = require('@admin-bro/mongoose');

AdminBro.registerAdapter(AdminBroMongoose);

const AdminUser = require('./admin.user');
const AdminCustomer = require('./admin.customers');
const Perposal = require('../models/Perposal');

const options = {
  branding: {
    companyName: 'E-contracter',
    softwareBrothers: false,
  },
  resources: [AdminUser, AdminCustomer, Perposal],
  locale: {
    translations: {
      messages: {
        loginWelcome:
          'E-contracter admin panel. Our mission make this field full of professional and build home your house in no time',
      },
    },
  },
};

module.exports = options;
