const express = require('express');
const log = require('morgan')('dev');
const bodyParser = require('body-parser');
const cors = require('cors');

var properties = require('./config/properties');
var db = require('./config/database');
var herosRoutes = require('./api/heros/heros.routes');
var bodyParserJSON = bodyParser.json();
var bodyParserURLEncoded = bodyParser.urlencoded({extended:true});
var router = express.Router();

var app = express();
// call the database connectivity function
db();
app.use(log);
app.use(cors());
app.use(bodyParserJSON);
app.use(bodyParser.urlencoded({
    extended: true
}));





require('./api/userauth/routes/auth.routes')(app);
require('./api/userauth/routes/user.routes')(app);
require('./api/posts/routes/post.routes')(app);
app.get('/all',(req,res) => {
     res.status(200).send("Public Content.");
})
app.use('/api',router);


//call heros routing
herosRoutes(router);


app.listen(properties.PORT, (req, res) => {
    console.log(`Server is running on ${properties.PORT} port.`);
})