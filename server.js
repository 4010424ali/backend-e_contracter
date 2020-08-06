const express = require('express');
const dotenv = require('dotenv');
const colors = require('colors');
const morgan = require('morgan');

// Load env vars
dotenv.config({ path: './config/config.env' });

// Bring errorHandler
const errorHanlder = require('./middleware/error');

// Bring the database file
const connectDB = require('./config/db');

// Bring the route file
const customerRoute = require('./routes/customer');
const perposalRoute = require('./routes/perposal');
const teamRoute = require('./routes/teambuilder');

// Init App
const app = express();

// Connect to database
connectDB();

// body Parser
app.use(express.json());

// Log for development
if (process.env.NODE_ENV === 'developmemt') {
  app.use(morgan('dev'));
}

// Mount the Route
app.use('/api/v1/customers', customerRoute);
app.use('/api/v1/perposal', perposalRoute);
app.use('/api/v1/team', teamRoute);

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
