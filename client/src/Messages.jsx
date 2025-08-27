import { useState, useEffect } from "react"
import { createMessage } from "./messages/messageService"

const Messages = ({ messages, room }) => {
  const [inputMessage, setInputMessage] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
   console.log("messages", messages)
  }, [messages])
  



  const sendMessage = async(e) => {
    console.log("sendMessage inputMessage", inputMessage)
    setIsLoading(true)

    const token = sessionStorage.getItem("token")

    if (token && inputMessage) {      
      const response = await createMessage(token, room.name.toLowerCase(), inputMessage)
      // TODO: check response before updating state (look for errors)
      setIsLoading(false)
      setInputMessage("")
    }
  }

  return (
    <div>
      {" "}
      {messages.filter(msg => msg.room === room.name.toLowerCase()).map((message, index) => (
        <div key={index} className="flex items-start gap-4.5 p-2">
          <div className="flex flex-col gap-1">
            <div className="flex flex-col w-full max-w-[936px] leading-1.5 p-2 border-purple-900 bg-cyan-100 rounded-e-sm rounded-es-xl dark:bg-cyan-500">
              <div className="flex items-center space-x-2 rtl:space-x-reverse">
                <span className="text-sm font-semibold text-gray-900 dark:text-white">
                  {" "}
                  <img
                    src={`${message.avatar}`}
                    className="w-10 h-10 rounded-full"
                  />
                  <br></br>
                  {message.username}{" "}
                </span>
                <span className="text-sm font-normal py-2 text-gray-900 dark:text-slate">
                  {" "}
                  {message.message}
                </span>
               
                  <span className="text-sm font-normal text-blue-700 dark:text-blue-700">
                    {" "}{new Date(message.timestamp).toLocaleString("en-US")}
                
                  </span>
              
              </div>
            </div>
          </div>
        </div>
      ))}
      <div className="fixed z-50 w-full h-16 max-w-lg -translate-x-1/2 bg-slate-700 border border-gray-200 bottom-4  left-1/2 bg-slate-700 dark:bg-slate-600 dark:border-gray-600">
        <div className="grid h-full max-w-lg grid-cols-1 mx-auto">
          <div className="flex items-center px-3 py-2 rounded-lg bg-slate-700 dark:bg-gray-700">
            <textarea
              type="text"
              value={inputMessage}
              id="chat"
              rows="1"
              onChange={(e) => setInputMessage(e.target.value)}
              className="block mx-4 p-2.5 w-full text-sm text-gray-900 bg-slate-500 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Your message..."
            ></textarea>
            <button
              onClick={sendMessage}
              disabled={isLoading}
              type="button"
              className="inline-flex justify-center p-2 text-blue-600 rounded-full cursor-pointer hover:bg-blue-100 dark:text-blue-500 dark:hover:bg-gray-600"
            >
              <svg
                className="w-5 h-5 rotate-90 rtl:-rotate-90"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 18 20"
              >
                <path d="m17.914 18.594-8-18a1 1 0 0 0-1.828 0l-8 18a1 1 0 0 0 1.157 1.376L8 18.281V9a1 1 0 0 1 2 0v9.281l6.758 1.689a1 1 0 0 0 1.156-1.376Z" />
              </svg>
              <span className="sr-only">Send message</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Messages
