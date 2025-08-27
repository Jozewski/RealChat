import { Router } from "express"
import passport from "passport"
import usersCreate from "./usersCreate.js"
import userListRefresh from "./userListRefresh.js"

const loggedInUsersRouter = Router()


loggedInUsersRouter.post("/", usersCreate)
.get("/refresh/:socketId", passport.authenticate("jwt", { session: false }), userListRefresh)
// loggedInUsersRouter.post("/", passport.authenticate("jwt", { session: false }), usersCreate)

export default loggedInUsersRouter