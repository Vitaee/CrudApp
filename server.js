const express = require('express');
const log = require('morgan')('dev');
const bodyParser = require('body-parser');
const cors = require('cors');



var properties = require('./config/properties');
var db = require('./config/database');
var herosRoutes = require('./api/heros/heros.routes');
var router = express.Router();

var app = express();
db();

app.use(log);
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/public', express.static('public'));






require('./api/userauth/routes/auth.routes')(app);
require('./api/userauth/routes/user.routes')(app);
require('./api/posts/routes/post.routes')(app);

app.use('/api',router);


//call heros routing
herosRoutes(router);


app.listen(properties.PORT, (req, res) => {
    console.log(`Server is running on ${properties.PORT} port.`);
})