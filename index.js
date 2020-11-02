const express = require('express');
const winston = require('winston');
const app = express();

require('./startup/logging')
require('./startup/routes')(app);
require('./startup/db')();
require('./startup/config')();
require('./startup/prod')(app);





const port = process.env.PORT || 3000;

  app.listen(port, () =>{
    console.log('Starting server '+ port +'....')
})
