const contreller = require('../controllers/post.controller');

module.exports = function (app) {
    app.post("/create-post",contreller.createPost)
    app.get("/posts",contreller.getPosts)
}