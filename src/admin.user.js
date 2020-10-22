const path = require('path');
const fs = require('fs');
const AdminBro = require('admin-bro');
const User = require('../models/User');

const options = {
  parent: {
    name: 'User',
    icon: 'far fa-user',
  },
  properties: {
    resetPasswordToken: {
      isVisible: false,
    },
    resetPasswordExpire: {
      isVisible: false,
    },
    createdAt: {
      isVisible: false,
    },
    password: {
      type: 'password',
    },
    image: {
      components: {
        edit: AdminBro.bundle('./components/editPhoto.tsx'),
        new: AdminBro.bundle('./components/editPhoto.tsx'),
      },
    },
  },
};

module.exports = {
  resource: User,
  options,
};
