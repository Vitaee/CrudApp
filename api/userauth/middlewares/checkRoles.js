import { userModel } from "../models/user.model.js";

export const checkRole = async (req, res, next) => {

  let findUser = await userModel.findById( { "_id":req.userId })

  if (findUser && findUser.roles.includes('admin')) {
    req.user = findUser
    next();
  } else {
    return res.status(403).send({message: "You don't have permission to do that!"})
  }


}