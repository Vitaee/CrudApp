const Post = require('../models/post.model');


exports.createPost = function (req,res,next) {
    let post = {
        title: req.body.title,
        content: req.body.content,
        createdBy: req.body.createdBy
    }

    Post.create(post, function (err) {
        if (err){
            res.json({
                error:err
            })
        }

        res.json({
            message: "User created successfully"
        })
    });
}