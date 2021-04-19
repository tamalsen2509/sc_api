
require('dotenv').config();
let express = require('express');
const { rawListeners } = require('../model/userModel');
let route = express.Router();
let User = require('../model/userModel');
let bcrypt = require('bcrypt');
let jwt = require('jsonwebtoken');
let authorize = require('../auth/authHelper');
let massege = require('../message/res_massege')

// index route base url/api/social/user 
// method get

route.get('/', (req,res)=>{
    res.status(200).json({massege})

})


// route for creating new user
// generate jwt including user and return the token with user obj;
route.post('/' , async(req,res)=> {
    let saltRound = 11;

    try {
        let hash = await bcrypt.hash(req.body.password, saltRound);

        let user = await User.create({
            name :req.body.name,
            email :req.body.email,
            password : hash
        });
        await user.save();
        let token = jwt.sign({id : user.userId}, process.env.SECRET, (err,token)=>{
            if (err) return res.status(400).json({msg: "Error generating token" , err });
            return res.status(201).json({"user" : user , "token" : token })    
        } )
        
    } catch (error) {
        console.log(error);
        return res.status(400).json(error)
    }

})




// route to display all user 

route.get('/all',authorize.isAuth ,async (req,res)=>{
    // access token should be added followed by 'access-token' on headers
    try {
        User.find({}).populate('posts').exec((err,user)=>{
            if (err) return res.status(400).json(err);
            return res.status(200).json(user)
        });
        
    } catch (error) {
        res.status(400).json(error);
    }
      
    
})

// route to display specific user 

route.get('/oneuser/:uuid',authorize.isAuth  , async (req,res)=>{
    let UUID = req.params.uuid;
    try {
        let user = await User.findOne({userId : UUID}).exec();
        return res.status(200).json(user);
    } catch (error) {
        res.status(500).json(error);
    }
    
})
// edit route for single user find by uuid
route.put('/oneuser/:uuid' ,authorize.isAuth  , async (req,res)=>{
    let UUID = req.params.uuid;

    let Name = req.body.name;
    let Email = req.body.email;
    let Password = req.body.password;
    
    try {
        let user = await User.findOneAndUpdate({ userId :  UUID },{$set: { name: Name, email : Email , password : Password  }} , {new : true} ).exec();
        return res.status(201).json(user);
    } catch (error) {
        console.log(error);
        return res.status(400).json(error)
    }
})
// delete a single by uuid details supplied

route.delete('/remove/:uuid' ,authorize.isAuth  , (req,res)=>{
    let UUID = req.params.uuid;
    User.findOneAndDelete({userId : UUID} , (err,data)=> {
        if (err) return res.status(400).json(err);
        return res.status(202).json({status : true, msg:"User Deleted", data : data.name })
    } )
})




module.exports = route;