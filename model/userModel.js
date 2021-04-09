let mongoose = require('mongoose');
let idGen = require('node-uuid-generator');




let userModel = new mongoose.Schema({
    userId : {
        type : String, // type string is required
        default : idGen.generate()
    },
    name : {
        type : String,
        required : [ 'Name field is required' , true  ]
    },
    email : {
        type : String,
        required : [ 'Email field is required' , true  ]
    },
    role :{
        type : String,
        required : true
    } ,
    posts : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Post'
    }]
    
},{
    timestamps : true,
    toObject:{
        transform  : (doc,ret)=>{
            ret.id = ret._id;
            delete ret.__v;
            delete ret._id;
            return ret;
        }
    },
    toJSON : {
        transform : (doc,ret)=>{
            delete ret._id;
            delete ret.__v
        } 
    }
})




module.exports = mongoose.model('User',userModel );