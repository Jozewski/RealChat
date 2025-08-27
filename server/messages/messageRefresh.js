import mongoose from "mongoose"
import axios from "axios"
import { io } from "../socket.js"
import messageModel from "./messageModel.js"

const messageRefresh = async (req, res, done) => { 
  const { username, avatar } = req.user
  const { socketId } = req.params
  console.log(username, socketId)
  try {  
    const getLast8MessagesByRoom = await messageModel.aggregate([
      {
        $group: {
          "_id": "$room",
          "messages": { "$addToSet": "$$ROOT" }
        }
      },
      {
        $project: {
          messages: {
            $slice: [
              {
                $sortArray: {
                  input: "$messages",
                  sortBy: {
                    _id: -1
                  }
                }
              },
              8
            ]
          }
        }
      }
    ])
    console.log(getLast8MessagesByRoom)

    io.to(socketId).emit("welcomeRoomMessageRefresh", getLast8MessagesByRoom)    
    res.status(200).json({ success: true, message: "Messages Refreshed!" })
  } catch (err) {
    res
      .status(200)
      .json({
        success: false,
        message: "There was an error getting the messages.",
      })
  }
}

export default messageRefresh