const Post = require('../models/post.model');



exports.createPost = function (req,res,next) {
    //const url = req.protocol + '://' + req.get('host')
    let post = {
        title: req.body.title,
        content: req.body.content,
        img: "",
        createdBy: req.body.createdBy
    }

    Post.create(post, function (err) {
        if (err){
            res.json({
                error:err
            })
        }

        res.json({
            message: "Post created successfully"
        })
    });
}

exports.getPosts = async function (req, res, next) {
     let posts =  await Post.find({'createdBy':'can'}).catch((e) => {
      return res.status(500).json({'An interval server error occurred while getting information, please try again later.':e})
    });


     return res.json(posts)

}