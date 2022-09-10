import { secret } from "../../../config/properties.js";
import { userModel } from "../models/user.model.js";
import jwt from "jsonwebtoken";
import bcryptjs from "bcryptjs";

export async function signup (req, res, next) {
    let user = {
        username: req.body.username,
        email: req.body.email,
        password:bcryptjs.hashSync(req.body.password, 8)
    };

    userModel.create(user, function(err, createdUser) {
        if(err) {
            res.json({
                error : err
            })  
          return;
        }
        
        var token = jwt.sign({ id: createdUser._id.toString() }, secret, {
          expiresIn: 86400 // 24 hours
        });

        res.status(200).send({
          message: "Success",
         accessToken: token
        });
    });
}


export function signin(req, res) {
    console.log(req.body)
    userModel.findOne({
    username: req.body.username
    })
    .exec((err, user) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }

      var passwordIsValid = bcryptjs.compareSync(
        req.body.password,
        user.password
      );

      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Invalid Password!"
        });
      }

      var token = jsonwebtoken.sign({ id: user.id }, secret, {
        expiresIn: 86400 // 24 hours
      });


      res.status(200).send({
        id: user._id,
        username: user.username,
        email: user.email,
       accessToken: token
      });

    });
}

export const allUsers = async (req, res) => {
  const allUsers = await userModel.find();
  return res.status(200).send(allUsers)
}
