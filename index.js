const express = require('express');
const app = express();
const config = require('config');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const registerUser = require('./routers/register');
const authUser = require('./routers/auth');
const forgotPass = require('./routers/forgotPass');
const ticketRouter = require('./routers/ticket');
const userRouter = require('./routers/user');
const appVersion = require('./routers/checkServer');


if (!config.get('jwtPrivateKey')) {
    console.error('FATAL ERROR: jwtPrivateKey is not defined.');
    process.exit(1);
  }

app.use(bodyParser.json());
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/uploads', express.static('uploads'));
app.use('/api/register', registerUser );
app.use('/api/auth', authUser );
app.use('/api/forgot', forgotPass );
app.use('/api/ticket', ticketRouter );
app.use('/api/user', userRouter);
app.use('/api/version', appVersion);





mongoose.connect('mongodb://localhost/ticket')
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB...'));


  

  app.listen(3000, () =>{
    console.log('Starting server....')
})
