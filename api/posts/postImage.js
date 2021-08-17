let express = require('express'),
    multer = require('multer'),
    router = express.Router();


const Post = require('./models/post.model')
const { v4: uuidv4 } = require('uuid');

const DIR = '../../public/';


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, DIR)
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + '-' +file.originalname )
    }
  })

var upload = multer({ storage: storage }).array('file')


router.post('/post', (req, res, next) => {
    upload(req,res,function (err) {

        console.log(req.body)
        console.log(req.file)

        const url = req.protocol + '://' + req.get('host')

        let post = {
            title: req.body.title,
            content: req.body.content,
            img:  url + '/public/' + req.file,
            createdBy: req.body.createdBy
        }

        Post.create(post, function (err) {
        if (err){
            res.json({
                error:err
            })
        }

        res.json({message: "Post created successfully"})

        });

    })

});



module.exports = router;