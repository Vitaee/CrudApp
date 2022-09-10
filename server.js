import express from 'express';
import morgan from "morgan";
import cors from 'cors';
import * as config from './config/properties.js';
import { db } from './config/database.js';
import { herosRoutes }  from './api/heros/heros.routes.js';
import { authRoutes } from './api/userauth/routes/auth.routes.js';
//const postRoutes = require('./api/posts/postImage')
import multer, { diskStorage, MulterError } from 'multer';


const router = express.Router();
const app = express();
import fileUpload from 'express-fileupload';
db();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(fileUpload());
app.use(cors({ origin:true, credentials: true }));
//app.use('/public', express.static('public'));



var storage = diskStorage({
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

        if (err instanceof MulterError) {
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




//require('./api/userauth/routes/user.routes').default(app);
//require('./api/posts/routes/post.routes').default(app);

app.use('/api',router);

//call other routes
herosRoutes(router);
authRoutes(router);


app.listen(config.PORT, (req, res) => {
    console.log(`Server is running on ${config.PORT} port.`);
})