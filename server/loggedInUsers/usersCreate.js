import mongoose from "mongoose"
import loggedInUsersModel from "./usersModel.js"

const loggedInUsersCreate = async (req, res, done) => {
  const { firstName, lastName, username, avatar } = req.body
  // Validation
  console.log(req.body)
  console.log(firstName, lastName, username, avatar)
 
  // TODO: Check if the user is already logged in
  const createLoggedInUsers = await loggedInUsersModel.create({ firstName, lastName, username, avatar})
  res.status(200).json({ message: "You did it!" })
}

export default loggedInUsersCreate