const config = require('config');
const mongoose = require('mongoose');

const answerSchema = new mongoose.Schema({

    date:{
        type: Date,
        default: Date.now
    },
    role:{
        type:String,
        default: 'user',
        required: true
    },
    message:{
        type: String,
        required: true
    }

});




exports.Answer = mongoose.model('Answers', answerSchema);
exports.answerSchema = answerSchema;