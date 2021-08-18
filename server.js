const express = require('express');
const log = require('morgan')('dev');
const bodyParser = require('body-parser');
const cors = require('cors');
const properties = require('./config/properties');
const db = require('./config/database');
const herosRoutes = require('./api/heros/heros.routes');
//const postRoutes = require('./api/posts/postImage')
const multer = require('multer');
const router = express.Router();
const app = express();
const fileUpload = require('express-fileupload');
db();

app.use(log);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload());
app.use(cors({ origin:true, credentials: true }));
//app.use('/public', express.static('public'));



var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'public')
    },
    filename: function (req, file, cb) {
        console.log(file)
      cb(null, Date.now() + '-' +file.originalname )
    }
  });

const upload = multer({storage: storage}).array('img');

app.post('/post',function(req, res) {
    console.log('req.file: ', JSON.stringify(req.file));
       console.log('req.files: ', JSON.stringify(req.files));

    upload(req, res, function (err) {

        if (err instanceof multer.MulterError) {
            return res.status(500).json(err)
          // A Multer error occurred when uploading.
        } else if (err) {
            return res.status(500).json(err)
          // An unknown error occurred when uploading.
        }
            console.log(req.file)
        console.log(req.body.file)
        console.log(req.body)

        return res.status(200).send(req.file)
        // Everything went fine.
      })
});



require('./api/userauth/routes/auth.routes')(app);
require('./api/userauth/routes/user.routes')(app);
require('./api/posts/routes/post.routes')(app);

app.use('/api',router);

//call heros routing
herosRoutes(router);


app.listen(properties.PORT, (req, res) => {
    console.log(`Server is running on ${properties.PORT} port.`);
})