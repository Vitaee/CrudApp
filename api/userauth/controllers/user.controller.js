const User = require("../models/user.model").default;
const bcrypt = require("bcryptjs");
exports.userBoard = async (req, res) => {
  //const userData = await User.findOne({username:req.body.username})
    const userData = await User.findById(req.userId)
    console.log(userData)
  res.status(200).send(userData);
}

exports.forgetPassword = async (req,res) => {
    const userData = await User.findById(req.userId)
    const passwordIsValid = await bcrypt.compare(req.body.oldPass,userData.password).catch((err) => {
    return res
      .status(500).send({message:err})
  });

    if(req.body.oldPass === req.body.newPass)
        return res.status(400).send("Your new password should not be same with the old one, please try a different password.")


    if (passwordIsValid){
        userData.password = await bcrypt.hash(req.body.newPass, 10);
        await userData.save().catch((error)=>{
            return res
                .status(500)
                .send({message:error.message})
        })
        return res.status(200).send({message:"Your password changed successfully!"})

    }
}