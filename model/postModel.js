let mongoose = require('mongoose');
let idGen = require('node-uuid-generator');




let postModel = new mongoose.Schema({
    postId : {
        type : String, // type string is required
        default : idGen.generate()
    },
    body : {
        type : String,
        required : [ 'Name field is required' , true  ]
    },
    postedBy : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User'
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