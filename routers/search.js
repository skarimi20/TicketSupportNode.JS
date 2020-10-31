const {Ticket} = require('../models/ticket');
const express = require('express');
const auth = require('../middlewear/auth');
const router = express.Router();


router.post('/',auth,async(req,res,next) =>{
    const search = req.body.searchString;
    await Ticket.find({$title:search, $answers: search})
    .exec(function(err, result) {
        if(err){
            res.status(500).send('Server Error');
        }else{
            res.send(200).send(result);
        }

    });
});


module.exports = router; 

