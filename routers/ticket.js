const auth = require('../middlewear/auth');
const config = require('config');
const bcrypt = require('bcrypt');
const {User} = require('../models/userModel');
const mongoose = require('mongoose');
const express = require('express');
const {Ticket,ticketSchema} = require('../models/ticket');
const {Answer,answerSchema} = require('../models/answer');

const router = express.Router();



router.post('/new', auth, async (req,res,send) =>{
    if(!req.body.department || !req.body.priority || !req.body.title || !req.body.message || !req.body.ticketType){
        res.status(400).send("Invalid Ticket");
    }else{

        const answerr = req.body.answers;
      
        var ticket = new Ticket({
            department: req.body.department,
            priority: req.body.priority,
            title: req.body.title,
            message: req.body.message,
            ticketType: req.body.ticketType,
            user: req.user,
            
        });

        const result = await ticket.save();
        if(result){
            res.status(200).json({_id: ticket._id});
        
        }else{
            res.status(400).json({Error: 'Error'});
        }
    }

});


router.get('/my', auth, async (req,res,next) => {

    const userID = req.user._id;
    const tickets = await Ticket
    .find({user: userID})
    .populate('user').exec(function (err,data) {
        if(err){
            res.status(500).send(err)
        }else{
            res.status(200).json(data);
        }
        
    });

});

router.post('/answer', auth, async(req,res,next) =>{
    const message = req.body.message;

    Ticket.update({_id: req.body.id}, {$push :{'answers': message}}, (err,row) =>{
        if(err){
            res.status(500).send(err);
        }else{
            res.status(200).send(row);
        }
    });
        
});






module.exports = router; 
