require('dotenv').config();
let jwt = require('jsonwebtoken');


module.exports.isAuth = (req,res,next) =>{
    let token = req.headers['access-token']
    if (!token) 
    return res.status(403).json({"status" : false, "msg" : "Please provide token"  })

    jwt.verify(token, process.env.SECRET, function (err,user){
        if (err) return res.status(401).json({"status" : false, "msg" : "Error in token validation" })
        req.user = user;
        next();
    })
    
}
