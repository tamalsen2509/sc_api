let express = require('express');
let cors = require ('cors');

let app = express();

// json data input middleware
app.use(express.json());

// db middleware
require('./db/connection').db()

// static file path
app.use(express.static('public'))

// enable cors 
app.use(cors({optionsSuccessStatus:200}))

// index route
app.get('/', (req,res)=>{
    res.sendFile(__dirname + '/views/index.html')
})

// active api endpoints
app.use('/api/social/user', require('./routes/user'));
app.use('/api/social/post', require('./routes/posts')); // in progress






module.exports = app;