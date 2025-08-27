import mongoose from "mongoose"
import axios from "axios"
import { io } from "../socket.js"
import messageModel from "./messageModel.js"

const messageCreate = async (req, res, done) => {
  const { room, message } = req.body
  const { username, avatar } = req.user
  // console.log(message, username)
  try {
    const createMessage = await messageModel.create({
      room,
      message,
      username,
      avatar,
      timestamp: new Date(),
    })
    console.log(createMessage.message)
    io.emit("welcomeRoomMessage", createMessage)
    // Check for chatbot conversations
    if (message.includes("@chatbot")) {
      console.log("Jesus Lives!")
      const chatResponse = await axios.post(process.env.OLLAMA_API, {
        model: "mistral",
        prompt: message,
        num_predict: 42,
      })
      console.log("chatResponse", chatResponse)
      let responseText = ""
      const responseLines = chatResponse.data.split("\n")
      for (const d of responseLines) {
        try {
          const obj = JSON.parse(d)
          console.log(obj.response)
          responseText += obj.response
        } catch (err) {
          // Do nothing but log
          console.log("This llama won't make donuts")
        }
      }
      const createBotMessage = await messageModel.create({
        room,
        message: responseText,
        username: "@chatbot",
        avatar: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAYABgAAD/2wBDAAMCAgMCAgMDAwMEAwMEBQgFBQQEBQoHBwYIDAoMDAsKCwsNDhIQDQ4RDgsLEBYQERMUFRUVDA8XGBYUGBIUFRT/2wBDAQMEBAUEBQkFBQkUDQsNFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBT/wAARCAArACoDASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwDzesrxN4nsPCem/btQkZIi6xIkaF3kduiqo5JPp7Vq15h8WtWEXiLwha29rNq17BeG9bTrUZkKKjKrnsAGPU+9fzrgqCxNdU5bat/JX36ep/SmOxDw1CVSO+iXzdtuvoeg6Hrdn4i0q31HT5hcWlwu5JBx+BHYg8YrKvPiFodj4oh0Ca6K6hIVThCUV2BKIzdAzAHA71w3g/4ceI5NLmabXL7wxbPczTWul2YTMCs5YB25z16dK5TxLpeteFIdR/tnT7jUJH1i2v28RQxjyxHHtALKOVwN3bGSa9mjluFqV50o1ebsk9d+7Vnbqlv0PErZni6WHhVlRcerbWm2uid436OWy31PoeiorW6ivbaK4gkWaCVQ8ciHKspGQQfTFS18y007M+pTTV0FeZWsl1Z/FTxtFbRwya1c6bb3Gm/aM+X5aqUZSRyB5nUd69Nrz/RHSz+NHiWG5H+kXthaz2jEf8sk3I4B7fOQcV6eBdo1tL+7/wC3Rf8Aw/lc8rHK8qGtvf3/AO3ZL/hvOxBF4q8S6lHG4nsNMC3f9nHbaPdebcLw5++uyPcCBnJwM8VZsfFOrXi6vJrNpYLommwTw6h5W53aZAGJQdDGY2HB5ByPru6h4F0zUL6a8DXdnPMQZWsruSASEDGWCkAnHfrU09rpXg/wreDyFi0y2hkllXliwwSxOeWJ5znrW8sRh5pRpw1dtLWt6O92+1/w2MI4fEwblUqaK+t737XVrJd7emu5jfBq3ntvhj4fS4++0BkXnOI2dmQfgpWu0rjfg7az2Xwz8PxXIIk+z7wD1CsxZB/3yRXZVxY93xdZ/wB6X5s7cvVsHRX92P5IK5fT/C9zbfELVtfmeGS2urOG2gAY+ZHtJLDGMYJIPXtXUUVz06sqako/aVn6XT/Q6qlKNVxcvsu69bNfqFVtTtBqGm3VsUWQTRNGVkOFOQRg+1WaKyi3Fpo0klJNMwfAeg3XhjwfpOlXssc91aQCJ3iJKHGcYJAOMYHTtW9RRV1Kkqs5VJbt3+8ilTjRpxpx2SS+4//Z",
        timestamp: new Date(),
      })
      console.log(createBotMessage.message)
      io.emit("welcomeRoomMessage", createBotMessage)

    }
    res.status(200).json({ success: true, message: "Message created!" })
  } catch (err) {
    res
      .status(200)
      .json({
        success: false,
        message: "There was an error creating the message.",
      })
  }
}

export default messageCreate
