import mongoose from "mongoose"

const Schema = mongoose.Schema

const messageSchema = new Schema({
  room: {
    type: String,
    default: ""
  },
  username: {
    type: String,
    default: ""
  },
  avatar: {
    type: String,
    default: ""
  },
  message: {
    type: String,
    default: ""
  },
  timestamp: {
    type: Date,
    default: new Date()
  }
})

export default messageSchema
