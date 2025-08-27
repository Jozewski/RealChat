import { io } from "socket.io-client"

// "undefined" means the URL will be computed from the `window.location` object
const URL = import.meta.env.VITE_API_SERVER_URL || "http://localhost:8000"

const user = sessionStorage.getItem("user") || '{"id": "", "email": "", "username": "", "avatar": "", "status": ""}'

export const socket = io(URL, {
  query: {
    user: user
  }
})

