import { Router } from "express"
import passport from "passport"
import messageCreate from "./messageCreate.js"
import messageRefresh from "./messageRefresh.js"


const messageRouter = Router()


messageRouter.post("/", passport.authenticate("jwt", { session: false }), messageCreate)
messageRouter.get("/refresh/:socketId", passport.authenticate("jwt", { session: false }), messageRefresh)

export default messageRouter