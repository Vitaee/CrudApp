import { signup, signin, allUsers } from "../controllers/auth.controller.js"
import { checkRoles, verifyUserToken } from "../middlewares/index.js";

export const authRoutes = function(router) {
  router.post("/auth/signup", signup);
  router.post("/auth/signin", signin);
  router.get('/auth/users', [ verifyUserToken ,checkRoles],  allUsers)
}