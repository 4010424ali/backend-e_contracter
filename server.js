const path = require('path');
const express = require('express');
const dotenv = require('dotenv');
const colors = require('colors');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const fileUpload = require('express-fileupload');
const cors = require('cors');
const AdminBro = require('admin-bro');

// Load env vars
dotenv.config({ path: './config/config.env' });

// Bring errorHandler
const errorHanlder = require('./middleware/error');

// Bring the database file
const connectDB = require('./config/db');

// Admin file
const options = require('./src/admin.options');
const buildAdminRouter = require('./src/aadmin.router');

// Bring the route file
const customerRoute = require('./routes/customer');
const perposalRoute = require('./routes/perposal');
const teamRoute = require('./routes/teambuilder');
const profileRoute = require('./routes/profile');
const authRoute = require('./routes/auth');
const shopeRoute = require('./routes/shop');
const productRoute = require('./routes/product');
const progressRoute = require('./routes/progress');
const orderRoute = require('./routes/order');
const reviewsRoute = require('./routes/review');

// Init App
const app = express();

// Connect to database
connectDB();

const admin = new AdminBro(options);
const router = buildAdminRouter(admin);

app.use(admin.options.rootPath, router);

// body Parser
app.use(express.json());

// Cookie Parser
app.use(cookieParser());

// Cors
app.use(cors());

// File uploading
app.use(fileUpload());

// Log for development
if (process.env.NODE_ENV === 'developmemt') {
  app.use(morgan('dev'));
}

// Set static folder
app.use(express.static(path.join(__dirname, 'public')));

// Mount the Route
app.use('/api/v1/customers', customerRoute);
app.use('/api/v1/perposal', perposalRoute);
app.use('/api/v1/team', teamRoute);
app.use('/api/v1/profile', profileRoute);
app.use('/api/v1/auth', authRoute);
app.use('/api/v1/shops', shopeRoute);
app.use('/api/v1/products', productRoute);
app.use('/api/v1/progress', progressRoute);
app.use('/api/v1/orders', orderRoute);
app.use('/api/v1/reviews', reviewsRoute);

// Error Middleware
app.use(errorHanlder);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () =>
  console.log(
    `Server running om ${process.env.NODE_ENV} mode on port ${PORT}`.green.bold
  )
);

// Handle unhandle promise rejection
process.on('unhandledRejection', (err, promise) => {
  console.log(`Error: ${err.message}`.red);
});
