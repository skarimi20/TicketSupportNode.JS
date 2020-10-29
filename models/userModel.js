const config = require('config');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
   
    name :{
        type: String,
        required: true,
        minlength: 3,
        maxlength: 25
    },
    number :{
        type: String,
        required: true,
        maxlength: 11,
        unique: true
    },
    password :{
        type: String,
        required:true,
        minlength: 4,
        maxlength: 255,
    },
    address:{
        type: String,
        maxlength: 100
    },
    date:{
        type: Date,
        default: Date.now
    }

      
});


userSchema.methods.generateAuthToken = function () {
    const token = jwt.sign({ _id: this.id}, config.get('jwtPrivateKey'));
    return token;
};



exports.User = mongoose.model('User', userSchema);
