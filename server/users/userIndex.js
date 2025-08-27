import { Router } from "express"
import passport from "passport"
import userCreate from "./userCreate.js"
import userAvatarUpload from "./userAvatarUpload.js"

const userRouter = Router()

// userRouter.post("/", passport.authenticate("jwt", { session: false }), userCreate)
userRouter.post("/", userCreate)
userRouter.put("/avatar", passport.authenticate("jwt", { session: false }), userAvatarUpload)


export default userRouter

