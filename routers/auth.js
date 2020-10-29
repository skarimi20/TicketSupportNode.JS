const bcrypt = require('bcrypt');
const _ = require('lodash');
const {User} = require('../models/userModel');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();




router.post('/', async (req, res) => {
  
    let user = await User.findOne({ number: req.body.mobileNumber });
    if (!user) {
        return res.status(400).send('Invalid email or password.');
    }else{
        const validPassword = await bcrypt.compare(req.body.password, user.password);
        if (!validPassword) return res.status(400).send('Invalid email or password.');
        const token = user.generateAuthToken();
        res.status(200).json({
            name: user.name,
            token: token
        });
    }

  });



  module.exports = router; 
