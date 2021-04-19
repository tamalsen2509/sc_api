require('dotenv').config()
let mongoose = require('mongoose');


module.exports = {
    db : async()=>{
        try {
            await mongoose.connect(process.env.MONGO_URI, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                useFindAndModify: true,
                useCreateIndex: true
            })
            console.log('connected to db')
        } catch (error) {
            console.log(error)
        }
    }
}
