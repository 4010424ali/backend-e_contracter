const AdminBro = require('admin-bro');
const { buildAuthenticatedRouter } = require('@admin-bro/express');
const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);

const buildAdminRouter = (admin) => {
  const router = buildAuthenticatedRouter(
    admin,
    {
      cookieName: process.env.COOKIE_NAME,
      cookiePassword: process.env.COOKIE_SCCRET,
      authenticate: async (email, password) => {
        const user = await User.findOne({ email }).select(
          'password email role'
        );
        if (user && user.role === 'admin') {
          const matched = await bcrypt.compare(password, user.password);
          if (matched) {
            return user;
          }
        }
        return false;
      },
    },
    null,
    {
      resave: false,
      saveUninitialized: true,
      store: new MongoStore({ mongooseConnection: mongoose.connection }),
    }
  );

  return router;
};

module.exports = buildAdminRouter;
