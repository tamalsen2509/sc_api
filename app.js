let express = require('express');



let app = express();

// json data input middleware
app.use(express.json());

// db middleware
require('./db/connection').db()

app.use('/api/social/user', require('./routes/user'));
app.use('/api/social/post', require('./routes/posts'));






module.exports = app;