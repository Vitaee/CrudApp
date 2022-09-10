import { signup, signin } from "../controllers/auth.controller.js"

export const authRoutes = function(router) {
  router.post("/auth/signup", signup);
  router.get('/auth/signin"', signin);
}