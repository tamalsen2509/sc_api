let mongoose = require('mongoose');
let idGen = require('node-uuid-generator');




let postModel = new mongoose.Schema({
    postId : {
        type : String, // type string is required
        default : idGen.generate()
    },
    title : {
        type : String,
        required : [true, "Please add title for your post"],
        max : [10, "Maximum 10 charcters are allowed"]
    }
    ,
    body : {
        type : String,
        required : [ 'Please enter the post' , true  ],
        max : [50,"Maximum 50 characters are allowed"]
    },
    userId : {
        type : mongoose.Types.ObjectId, ref: 'User',
        required : true
    }
    
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




module.exports = mongoose.model('Post',postModel);