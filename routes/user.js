
let express = require('express');
const { rawListeners } = require('../model/userModel');
let route = express.Router();
let User = require('../model/userModel')

// route for creating new user

route.post('/' , async(req,res)=> {
    let {name , email, role} = req.body;

    try {
        let user = await User.create(req.body);
        await user.save();
        return res.status(201).json(user)
    } catch (error) {
        console.log(error);
        return res.status(400).json(error.errors)
    }

})

// route to display all user 

route.get('/all', async (req,res)=>{

    try {
        let users = await User.find({});
        return  res.status(200).json(users)

    } catch (error) {
        console.log(error);
        return res.status(400).json(error)
    }

})

// route to display specific user 

route.get('/oneuser/:uuid', async (req,res)=>{
    let UUID = req.body.params;
    
    try {
        let user = await User.findOne ({ userId :  UUID  }).exec();
        return res.status(200).json(user)

    } catch (error) {
        console.log(error);
        return res.status(400).json(error)
    }
    
})
// edit route for single user find by uuid
route.put('/oneuser/:uuid' , async (req,res)=>{
    let UUID = req.body.params;

    let Name = req.body.name;
    let Email = req.body.email;
    let Role = req.body.role;
    
    try {
        let user = await User.findOneAndUpdate({ userId :  UUID },{$set: { name: Name, email : Email , role : Role  }} , {new : true} ).exec();
        return res.status(201).json(user);
    } catch (error) {
        console.log(error);
        return res.status(400).json(error)
    }
})
// delete a single by uuid details supplied

// route.delete('/user/:uuid' , async (req,res)=>{
//     let UUID = req.body.params;
    
    
//     try {
//         await User.deleteOne({userId  : UUID});
//         return res.status(204).json('User Deleted')
//     } catch (error) {
//         console.log(error);
//         return res.status(400).json(error)
//     }
// })





module.exports = route;