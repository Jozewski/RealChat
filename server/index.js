import "dotenv/config"
import express from "express"
import cors from "cors"
import mongoose from "mongoose"
import session from "express-session"
import cookieParser from "cookie-parser"
import passport from "passport"
import { app, server } from "./socket.js"
import "./strategies/jwtStrategy.js" // Passport JWT strategy
import "./strategies/localStrategy.js" // Passport local strategy
import authRouter from "./auth/index.js"
import userRouter from "./users/userIndex.js"
import messageRouter from "./messages/messageIndex.js"
import loggedInUsersRouter from "./loggedInUsers/usersIndex.js"

const port = process.env.PORT || 8000
const cookieSecret = process.env.COOKIE_SECRET || "secret"
const sessionSecret = process.env.SESSION_SECRET || "secret"

app.use(express.json({ limit: "500kb" }))
app.use(cookieParser(cookieSecret))

// Express CORS
// Get whitelisted domains from env
const whitelist = process.env.WHITELISTED_DOMAINS
  ? process.env.WHITELISTED_DOMAINS.split(",")
  : []
// Set CORS options
const corsOptions = {
  origin: (origin, callback) => {
    if (!origin || whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    }
    else {
      callback(new Error("Not allowed by CORS"))
    }
  },
  credentials: true
}
// Use CORS
app.use(cors(corsOptions))

// Sessions, default
app.use(session({}))

// Add Passport
app.use(passport.initialize())
app.use(passport.session())

app.use("/auth", authRouter)
app.use("/users", userRouter)
app.use("/messages", messageRouter)
app.use("/loggedinusers", loggedInUsersRouter)

app.all('*', (req, res) =>{
  res.status(404).json({
      success: false,
      data: '404'
  })
})

const connectedUsers = {}

// io.on("connection", (socket) => {
//   // console.log("connection", socket.id)
//   console.log("connection handshake", socket.handshake.query)

//   // Get user id
// 	const user = JSON.parse(socket.handshake.query.user)
// 	if (user) {
//     // Add to user list
//     connectedUsers[user.id] = user
//     // Broadcast user list
//     io.emit("getOnlineUsers", Object.keys(connectedUsers))
//   }
//   console.log("connectedUsers", connectedUsers, Object.keys(connectedUsers))
  
//   // When a user joins the Welcome room
//   socket.on("Welcome joined", (user) => {
//     console.log("Welcome joined: " + user.username)
//     io.emit("Welcome joined", connectedUsers)
//   })

//   // When a user sends a message in the Welcome room
//   socket.on("Welcome messaged", (msg) => { // Express will handle this
//     console.log("Welcome messaged: " + msg)
//     io.emit("Welcome messaged", msg)
//   })

//   socket.on("foo", (msg) => {
//     console.log("foo message: " + msg)
//     io.emit("foo", msg)
//   })
// })




try {
  const mongoURL = process.env.MONGODB_URL || ""
  await mongoose.connect(mongoURL)
  console.log(`Real Chat connected to database ${mongoURL}`)

  server.listen(port, () => {
    console.log(`Real Chat listening on port ${port}`)
  })
}
catch(err) {
  console.log(err)
}

