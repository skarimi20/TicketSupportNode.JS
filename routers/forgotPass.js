const _ = require('lodash');
const {User} = require('../models/userModel');
const mongoose = require('mongoose');
const express = require('express');
const config = require('config');
const request = require('request');
const router = express.Router();
let Token = '';

router.post('/', async(req,res,next) =>{
    let user = await User.findOne({ number: req.body.mobileNumber });
    if (!user) {
        return res.status(400).send('this number not Registered');
    }else{

        const mobile = req.body.mobileNumber;
        const code = req.body.SecretCode;

        const data = {
          UserApiKey : config.get('UserApiKey'),
          SecretKey: config.get('SecretKey')
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
                      const token = user.generateAuthToken();

                      res.status(200).json({
                        name: user.name,
                        token: token
                    });
                  }
              });    
    
        };
        

    }
});


module.exports = router; 
