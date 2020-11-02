const winston = require('winston');
const mongoose = require('mongoose');
const config = require('config');

module.exports = function() {
  const dbLink = `mongodb+srv://saeed_karimi20:${config.get('db_password')}@ticket.23qub.mongodb.net/Ticket?retryWrites=true&w=majority`
  mongoose.connect(dbLink)
    .then(() => winston.info(`Connected to ...`));
}