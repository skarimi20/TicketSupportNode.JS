const {Ticket} = require('../models/ticket');
const express = require('express');
const auth = require('../middlewear/auth');
const router = express.Router();


router.post('/',auth,async(req,res,next) =>{
    const search = req.body.searchString;
    var result = await Ticket.find({title:search,answers:{'$in': [search]}});

    if(result){
        res.status(200).send(result);
    }
});


module.exports = router; 

