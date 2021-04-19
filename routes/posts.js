let express = require('express');
let route = express.Router();
let Post = require('../model/postModel');
let User = require('../model/userModel');



route.post('/create/:useruuid' , async(req,res)=>{
    let UUID = req.params.useruuid;
    let {title, body} = req.body;
    
    try {
        let user = await User.findOne({userId : UUID});
        let userId = user._id
        let newpost = await new Post({ title , body , userId })
        await newpost.save();
        return res.status(200).json({"status":true, "posts" : newpost })
    } catch (error) {
        return res.status(404).json(error)
    }
})














module.exports = route;


