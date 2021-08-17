const contreller = require('../controllers/post.controller');

module.exports = function (app) {
    app.get("/posts",contreller.getPosts)
}