const {Version} = require('../models/version');
const {User} = require('../models/userModel');
const mongoose = require('mongoose');
const express = require('express');
const auth = require('../middlewear/auth');
const router = express.Router();


router.get('/',async(req,res,next) =>{
    const version = await Version.findById('5f9abff8e8fd264f9708212f');
    res.status(200).send(version);
});

router.get('/check' ,auth, async(req,res,next)=>{

    const user = await User.findById(req.user._id);
    if(user){
        res.status(200).send('successful');
    }else{
        res.status(404).send('failed')
    }
})


module.exports = router; 

