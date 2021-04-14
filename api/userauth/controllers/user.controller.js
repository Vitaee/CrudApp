const User = require("../models/user.dao");
const bcrypt = require("bcryptjs");
exports.userBoard = async (req, res) => {
  const userData = await User.findOne({username:req.body.username})
    console.log(req.user)

  res.status(200).send({data:userData});
}


exports.forgetPassword = async (req,res) => {

    const userData = await User.findById(req.userId)
    const passwordIsValid = await bcrypt.compare(req.body.oldPass,userData.password).catch((err) => {
    return res
      .status(500).send({message:err})
  });

    if(req.body.oldPass === req.body.newPass){
        return res.status(400).send("Your new password should not be same with the old one, please try a different password.")
    }

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