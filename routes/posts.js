let express = require('express');
let route = express.Router();
let Post = require('../model/postModel');
let User = require('../model/userModel');



route.post('/' , async (req,res)=>{
    
    try {
        let test = await User.findOne({userId : '9cb75d64-771a-4fb0-99b6-1d9fcf56a44d'});
        let biju = await User.findOne({userId : '603e94ef-f73d-45bd-999f-1a0e7349feaa'});
        //await test.save()
        //await biju.save()

        let testPost = await  new Post({body : 'Suspendisse potenti. Nullam porttitor lacus at turpis. Donec posuere metus vitae ipsum',postedBy :test._id },
        {body : 'Integer tincidunt ante vel ipsum. Praesent blandit lacinia erat. Vestibulum sed magna at nunc commodo placerat.',postedBy :test._id }   );


    } catch (error) {
        
    }


})
















module.exports = route;


