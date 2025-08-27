import mongoose from "mongoose"
import userModel from "./userModel.js"
import loggedInUsersModel from "../loggedInUsers/usersModel.js"

const userAvatarUpload = async (req, res, done) => {
  const { avatar } = req.body
  const { _id, username } = req.user
  console.log(req.user)
  console.log(avatar)
  const updateUserAvatar = await userModel.updateOne({ _id }, { avatar })
  const updateLoggedInAvatar = await loggedInUsersModel.updateOne({ username }, { avatar })
  res.status(200).json({ success: true, message: "Avatar uploaded!" })
}

export default userAvatarUpload
