const express = require('express');
const log = require('morgan')('dev');
const bodyParser = require('body-parser');
const cors = require('cors');
const properties = require('./config/properties');
const db = require('./config/database');
const herosRoutes = require('./api/heros/heros.routes');
const postRoutes = require('./api/posts/postImage')

const router = express.Router();
const app = express();
db();

app.use(log);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use('/public', express.static('public'));






require('./api/userauth/routes/auth.routes')(app);
require('./api/userauth/routes/user.routes')(app);
require('./api/posts/routes/post.routes')(app);

app.use('/api',router);
app.use('/', postRoutes)

//call heros routing
herosRoutes(router);


app.listen(properties.PORT, (req, res) => {
    console.log(`Server is running on ${properties.PORT} port.`);
})