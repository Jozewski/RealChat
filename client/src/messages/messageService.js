import axios from "axios"

export const createMessage = async (token, room, message) => {
  console.log("messageService createMessage", token, room, message)
  const response = await axios.post(
    `${import.meta.env.VITE_API_SERVER_URL}/messages`,
     { room, message },
     { withCredentials: true, headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` }}
    )
  console.log("response", response.data)
  return response.data
}

export const getMessagesOnRefresh = async (token, socketId) => {
  const response = await axios.get(
    `${import.meta.env.VITE_API_SERVER_URL}/messages/refresh/${socketId}`,
    { withCredentials: true, headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` }}
  )
}