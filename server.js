var express = require('express');
var log = require('morgan')('dev');
var bodyParser = require('body-parser');

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
app.use(bodyParserJSON);
app.use(bodyParser.urlencoded({
    extended: true
}));

// Error handling
app.use(function (req,res,next){
    res.setHeader("Acces-Control-Allow-Origin","*");
    res.setHeader("Access-Control-Allow-Credentials", "true");
     res.setHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
     res.setHeader("Access-Control-Allow-Headers", "Access-Control-Allow-Origin,Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers,Authorization");
   next();
})



require('./api/userauth/routes/auth.routes')(app);
require('./api/userauth/routes/user.routes')(app);
app.get('/all',(req,res) => {
     res.status(200).send("Public Content.");
})
app.use('/api',router);


//call heros routing
herosRoutes(router);


app.listen(properties.PORT, (req, res) => {
    console.log(`Server is running on ${properties.PORT} port.`);
})