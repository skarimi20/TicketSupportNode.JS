const config = require('config');
const mongoose = require('mongoose');

const versionModel = new mongoose.Schema({

    lastVersion:{
        type: Number,
        require: true
    },
    downloadLink:{
        type:String,
        required:true
    }

});




exports.Version = mongoose.model('Version', versionModel);
exports.versionModel = versionModel;