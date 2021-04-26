const { verifySignUp } = require("../middlewares");
const controller = require("../controllers/auth.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "x-access-token"
    );
    next();
  });

  app.post("/auth/signup", [verifySignUp.checkDuplicateUsernameOrEmail], controller.signup);

  app.post("/auth/signin", controller.signin);

};