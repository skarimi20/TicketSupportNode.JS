const jwt = require('jsonwebtoken');
const auth = require('../middlewear/auth');
const config = require('config');
const _ = require('lodash');
const {User} = require('../models/userModel');
const mongoose = require('mongoose');
const express = require('express');
const querystring = require('querystring');
const request = require('request');
const router = express.Router();
let Token = '';

router.post('/', async function (req, res) {

    const mobile = req.body.mobileNumber;
    const code = req.body.SecretCode;

    let user = await User.findOne({number: req.body.mobileNumber});
    if(user){
        return res.status(400).send('Already Registered');
    }else{

    if(!mobile || !code){
        res.status(400).json({error: "Please Enter Valid number and code"});
    }else{
    

    const data = {
        UserApiKey : 'bc7443bdba97546ec4f243bd',
        SecretKey: '@@@AAssAAwwef@'
    }

      request.post({url: 'https://RestfulSms.com/api/Token',form: data}, function (err , cb, body) {
        if (err) {
            return console.error('upload failed:', err);
          };

          
          Token = JSON.parse(body).TokenKey;

      });
      const Verification = {
        Code : code,
        MobileNumber: mobile
    }
      if(Token){
          request.post({url: 'https://RestfulSms.com/api/VerificationCode', headers: {
              'x-sms-ir-secure-token': Token
          },form: Verification}, function(err,cb,body){
            if (err) {
                return console.error('upload failed:', err);
              };
              if(JSON.parse(body).IsSuccessful){
                  res.status(200).json({IsSuccessful: true});
              }else{
                  res.status(400).json({IsSuccessful: false});
              }
          });    

    };
    }
}

});

router.post('/user',async (req,res,next) =>{
    if(!req.body.name || !req.body.number || !req.body.password){
        res.status(400).send('Please Enter name, number , password');
    }
    user = new User(_.pick(req.body, ['name', 'number', 'password']));
        await user.save();
      
        const token = user.generateAuthToken();
        // res.header('x-auth-token', token).send(_.pick(user, ['_id']));
        res.status(200).json({Token: token});

})









// router.get('/me', auth, async (req, res) => {
//     const user = await User.findById(req.user._id).select('-password');
//     res.send(user);
//   });

// router.post('/', async (req,res,next) =>{

//     if(!req.body.name || !req.body.number || !req.body.password){
//         res.status(400).send('Please Enter name, username , password');
//     }
//     let user = await User.findOne({ username : req.body.username });
//     if (user){
//         return res.status(400).send('Already Registered');
//     } else{
//         user = new User(_.pick(req.body, ['name', 'username', 'password']));
//         const salt =  await bcrypt.genSalt(10);
//         user.password =  await bcrypt.hash(user.password, salt);
//         await user.save();
      
//         const token = user.generateAuthToken();
//         // res.header('x-auth-token', token).send(_.pick(user, ['_id']));
//         res.status(200).json({token: token});

//     }

// });






module.exports = router; 
