const express = require('express');
const registerUser = require('../routers/register');
const authUser = require('../routers/auth');
const forgotPass = require('../routers/forgotPass');
const ticketRouter = require('../routers/ticket');
const userRouter = require('../routers/user');
const appVersion = require('../routers/checkServer');
const error = require('../middlewear/error');

module.exports = function(app) {
  app.use(express.json());
  app.use('/api/register', registerUser );
  app.use('/api/auth', authUser );
  app.use('/api/forgot', forgotPass );
  app.use('/api/ticket', ticketRouter );
  app.use('/api/user', userRouter);
  app.use('/api/version', appVersion);  
  app.use(error);

}