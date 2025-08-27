
import mongoose from "mongoose"
import loggedInUsersSchema from "./usersSchema.js"

loggedInUsersSchema.set("toJSON", {
  transform: (doc, ret, options) => {
    ret.id = ret._id
    delete ret._id  
    delete ret.__v
    return ret
  }
})
const loggedInUsersModel = mongoose.model("LoggedInUsers", loggedInUsersSchema)
export default loggedInUsersModel