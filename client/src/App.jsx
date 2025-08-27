/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react"
import { Routes, Route } from "react-router"
import { socket } from "./socket"
import { getMessagesOnRefresh } from "./messages/messageService"
import { getLoggedInUsers } from "./loggedInUsers/loggedInUserService"
import PrivateRoute from "./PrivateRoute"
import { ConnectionState } from "./ConnectionState"
import Navbar from "./Navbar"
import Home from "./Home"
import Rooms from "./Rooms"
import Dashboard from "./Dashboard"
import Login from "./Login"
import UserProfile from "./UserProfile"
import NoMatch from "./NoMatch"
import "./App.css"

function App() {
  const [ isConnected, setIsConnected ] = useState(socket.connected)
  // const [ socketId, setSocketId ] = useState(socket.id)
  const [ welcomeJoined, setWelcomeJoined ] = useState({})
  const [ fooEvents, setFooEvents ] = useState([])
  const [ messages, setMessages ] = useState([])
  const [ users, setUsers ] = useState([])

   useEffect(() => {
     const refresh = async (socketId) => {
       console.log("isConnected, socketId", isConnected, socketId)
       const token = sessionStorage.getItem("token")
       if(token) {
         const messageResponse = await getMessagesOnRefresh(token, socketId)
         // TODO: Also refresh online user list
         const loggedInResponse = await getLoggedInUsers(token, socketId)
       }
     }

     // TODO: This is a patch for Chrome refresh problem. Look up a more robust solution.
     if (socket.id) {   
      refresh(socket.id)
     }

    function onConnect() {
      setIsConnected(true)
      // setSocketId(socket.id)
      refresh(socket.id)
    }

    function onDisconnect() {
      setIsConnected(false)
    }

    const onWelcomeJoined = (roomList) => {
      console.log("onWelcomeJoined value", roomList)
       // TODO: sync up sessionStorage with server user list
      setWelcomeJoined(roomList)
    }

    function onWelcomeMessage(msg) {
      console.log("msg", msg)
      setMessages(previous => [ ...previous, msg ])
    }

    function onWelcomeMessageRefresh(msgs) {
      console.log("msgs", msgs)
      let allMessages = []
      msgs.forEach(room => {
        allMessages.push(...room.messages)
      })
      console.log("allMessages", allMessages)
      setMessages(previous => [ ...previous, ...allMessages.reverse() ])
    }

    function onGetOnlineUsers(userList) {
      console.log("onGetOnlineUsers", userList)
      setUsers(userList)
    }  

    socket.on("connect", onConnect)
    socket.on("disconnect", onDisconnect)
    socket.on("Welcome joined", onWelcomeJoined)
    socket.on("welcomeRoomMessage", onWelcomeMessage)
    socket.on("welcomeRoomMessageRefresh", onWelcomeMessageRefresh)
    socket.on("getOnlineUsers", onGetOnlineUsers)

 

    return () => {
      socket.off("connect", onConnect)
      socket.off("disconnect", onDisconnect)
      socket.off("Welcome joined", onWelcomeJoined)
      socket.off("welcomeRoomMessage", onWelcomeMessage)
      socket.off("welcomeRoomMessageRefresh", onWelcomeMessageRefresh)
      socket.off("getOnlineUsers", onGetOnlineUsers)
    }
  }, [])


  return (
    <>
      {/* <ConnectionState isConnected={ isConnected } /> */}
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route element={<PrivateRoute />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/rooms" element={<Rooms events={fooEvents} welcomeJoined={welcomeJoined} messages={messages} users={users} />} />
        <Route path="/profile" element={<UserProfile />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<NoMatch />} />
      </Routes>
    </>
  )
}

export default App

