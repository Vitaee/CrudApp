const { authJwt } = require("../middlewares");
const controller = require("../controllers/user.controller");
module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "x-access-token"
    );
    next();
  });


  app.get("/user", [authJwt.verifyToken], controller.userBoard);
  app.post("/forgetPass",[authJwt.verifyToken], controller.forgetPassword);

};
