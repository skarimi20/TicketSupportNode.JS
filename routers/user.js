const jwt = require('jsonwebtoken');
const auth = require('../middlewear/auth');
const config = require('config');
const _ = require('lodash');
const {User} = require('../models/userModel');
const express = require('express');
const router = express.Router();



router.get('/me',auth,async (req,res,next) =>{
    const user = await User.findById(req.user._id).select('-password');
    res.status(200).send(user);
});

router.post('/update', auth, async (req,res,next) =>{
    const user = await User.findById(req.user._id);
    const name = req.body.name;
    const number = req.body.number;
    const newPassword = req.body.newPassword;
    const oldPassword = req.body.oldPassword;
    if(newPassword || oldPassword){
    if(oldPassword === user.password){
    user.password =  req.body.password;
    user.name = name;
    user.number = number;
    const save = await user.save();
    if(save){
        res.status(200).send('Successfully');
    }else{
        res.status(500).send("Error");
    }
        }else{
            res.send(400).send('Password is incorrect')
        }
    }else{
        user.name = name;
    user.number = number;
    const save = await user.save();
    if(save){
        res.status(200).send('Successfully');
    }else{
        res.status(500).send("Error");
    }

    }
    
});



module.exports = router; 
