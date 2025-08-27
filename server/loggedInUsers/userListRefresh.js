import mongoose from "mongoose"
import axios from "axios"
import { io } from "../socket.js"
import loggedInUsersModel from "./usersModel.js"

const userListRefresh = async (req, res, done) => { 
  const { username, avatar } = req.user
  const { socketId } = req.params
  console.log(username, socketId)
  try {  
    const getOnlineUserList = await loggedInUsersModel.find()
    console.log(getOnlineUserList)

    io.to(socketId).emit("getOnlineUsers", getOnlineUserList)    
    res.status(200).json({ success: true, users: getOnlineUserList })
  } catch (err) {
    res
      .status(200)
      .json({
        success: false,
        message: "There was an error getting the Users.",
      })
  }
}

export default userListRefresh