const config = require('config');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const user = require('../models/userModel');

const ticketSchema = new mongoose.Schema({

    date:{
        type: Date,
        default: Date.now
    },
    department:{
        type: String,
        require: true,
    },
    priority:{
        type: String,
        require: true
    },
    title:{
        type: String,
        required: true

    },
    message:{
        type: String,
        required: true
    },
    ticketType: {
        type: String,
        required: true
    },
    image:{
        type: String

    },
   answers:{
       type: [String]
   },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref : 'User'
    }
      
});




exports.Ticket = mongoose.model('Ticket', ticketSchema);
exports.ticketSchema = ticketSchema;