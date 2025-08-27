
import mongoose from "mongoose"
const Schema = mongoose.Schema

const loggedInUsersSchema = new Schema({
  firstName: {
    type: String,
    default: ""
  },
  lastName: {
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
  }
  
})
export default loggedInUsersSchema