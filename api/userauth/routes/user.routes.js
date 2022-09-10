import { authJwt } from "../middlewares";
import { userBoard, forgetPassword } from "../controllers/user.controller";
export default function(app) {
  app.use(function(req, res, next) {
    res.header(
      "x-access-token"
    );
    next();
  });


  app.get("/user", [authJwt.verifyToken], userBoard);
  app.post("/forgetPass",[authJwt.verifyToken], forgetPassword);

};
