/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { Link } from "react-router"
import { useState, useEffect } from "react"
import { socket } from "./socket"
import Messages from "./Messages"
import OnlineUsers from "./OnlineUsers"

const Rooms = ({ events, welcomeJoined, messages, users }) => {
  const user = JSON.parse(sessionStorage.getItem("user")) || {
    id: "",
    email: "",
    username: "",
    avatar: "",
    status: "",
  }
  console.log("user", user)

  const [rooms, setRooms] = useState([
    { name: "Welcome", isActive: true },
    { name: "Torah", isActive: false },
    { name: "Kings & Chronicles", isActive: false },
    { name: "Wisdom Books", isActive: false },
    { name: "Major Prophets", isActive: false },
    { name: "Minor Prophets", isActive: false },
    { name: "Matthew", isActive: false },
    { name: "Mark", isActive: false },
    { name: "Luke", isActive: false },
    { name: "John", isActive: false },
    { name: "Epistles", isActive: false },
    { name: "Revelations", isActive: false },
  ])

  useEffect(() => {
    console.log("welcomeJoined", welcomeJoined)
  }, [welcomeJoined])

  useEffect(() => {
    socket.timeout(1500).emit("Welcome joined", user)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleJoinRoom = (room) => {
    console.log("room", room)
    // setIsLoading(true)
    // Join room
    // socket.timeout(1500).emit(`${room.name} joined`, "User object", () => {
    //   setIsLoading(false)
    // })
    // Update selected room
    setRooms(
      rooms.map((r) =>
        r.name === room.name
          ? { ...r, isActive: true }
          : { ...r, isActive: false }
      )
    )
 
  }

  return (
    <>
      <div className="bg-slate-200">
        <div className="grid grid-rows-3 grid-flow-col gap-4 px-4 py-4 top-0">
          <div className="p-6 w-full bg-slate-500 rounded-xl col-span-1 row-span-3 ">
           
            <aside
              id="separator-sidebar"
              className="top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0"
              aria-label="Sidebar"
            >
              <ul className="space-y-2 font-medium">
                <li>
                  <Link
                    to="/rooms"
                    className="flex items-center p-2 text-gray-900 rounded-lg dark:text-yellow-300 hover:bg-gray-100 dark:hover:bg-gray-700 group"
                  >
                    <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="yellow"
                    viewBox="0 0 24 24"
                    strokeWidth="0.5"
                    stroke="red"
                    className="size-8"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25V6ZM3.75 15.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25H6A2.25 2.25 0 0 1 3.75 18v-2.25ZM13.5 6a2.25 2.25 0 0 1 2.25-2.25H18A2.25 2.25 0 0 1 20.25 6v2.25A2.25 2.25 0 0 1 18 10.5h-2.25a2.25 2.25 0 0 1-2.25-2.25V6ZM13.5 15.75a2.25 2.25 0 0 1 2.25-2.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-2.25A2.25 2.25 0 0 1 13.5 18v-2.25Z"
                    />
                  </svg>
                    <span className="flex-1 ms-3 whitespace-nowrap">
                      Discussion Rooms
                    </span>
                  </Link>
                </li>
                {rooms.map((room, index) => (
                  <li key={index} onClick={() => handleJoinRoom(room)}>
                    <span
                      className={`flex items-center p-2 rounded-lg ${
                        room.isActive
                          ? "text-emerald-900 dark:text-yellow-300 bg-gray-100 dark:bg-gray-700 group"
                          : "text-gray-900 dark:text-yellow-300"
                      } hover:bg-gray-100 dark:hover:bg-gray-700 group`}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="yellow"
                        viewBox="0 0 24 24"
                        strokeWidth="0.75"
                        stroke="red"
                        className="size-8"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25"
                        />
                      </svg>
                      <span className="ms-3">{room.name}</span>
                    </span>
                  </li>
                ))}
              </ul>
            </aside>
          </div>
          <div className="p-6 w-full bg-slate-300 rounded-xl row-span-3 col-span-12 ">
           

            <Messages messages={messages} room={rooms.filter(room => room.isActive)[0]}/>
    
          
          </div>
          
          <div className="p-6 w-full bg-slate-400 rounded-xl row-span-3 col-span-4">
          
           <OnlineUsers users={users} />
            <div className="fixed z-50 w-1/6 h-16 max-w-lg -translate-x-1/2 bg-white border border-gray-200 rounded-full bottom-4 left-7/8 bg-slate-700 dark:bg-slate-700 dark:border-gray-600">
              <div className="grid h-full max-w-lg grid-cols-3 mx-auto">
                <Link
                  to="/dashboard"
                  data-tooltip-target="tooltip-home"
                  type="button"
                  className="inline-flex flex-col items-center justify-center px-5 rounded-s-full bg-slate-600 hover:bg-slate-700 dark:hover:bg-gray-800 group"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="cyan"
                    viewBox="0 0 24 24"
                    strokeWidth="1.25"
                    stroke="white"
                    className="size-10"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M8.25 21v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21m0 0h4.5V3.545M12.75 21h7.5V10.75M2.25 21h1.5m18 0h-18M2.25 9l4.5-1.636M18.75 3l-1.5.545m0 6.205 3 1m1.5.5-1.5-.5M6.75 7.364V3h-3v18m3-13.636 10.5-3.819"
                    />
                  </svg>
                  <span className="sr-only">Dashboard</span>
                </Link>
                <div
                  id="tooltip-home"
                  role="tooltip"
                  className="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-xs opacity-0 tooltip dark:bg-gray-700"
                >
                  Dashboard
                  <div className="tooltip-arrow" data-popper-arrow></div>
                </div>

                <Link
                  to="/requests"
                  data-tooltip-target="tooltip-requests"
                  type="button"
                  className="inline-flex flex-col items-center justify-center px-5 bg-slate-600 hover:bg-slate-700 dark:hover:bg-gray-800 group"
                >
                  <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="purple"
                      viewBox="0 0 24 24"
                      strokeWidth="1.25"
                      stroke="yellow"
                      className="size-10"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 5.25h.008v.008H12v-.008Z"
                      />
                    </svg>
                  <span className="sr-only">Requests</span>
                </Link>
                <div
                  id="tooltip-requets"
                  role="tooltip"
                  className="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-xs opacity-0 tooltip dark:bg-gray-700"
                >
                  Requests
                  <div className="tooltip-arrow" data-popper-arrow></div>
                </div>
                <Link
                  to="/profile"
                  data-tooltip-target="tooltip-profile"
                  type="button"
                  className="inline-flex flex-col items-center justify-center px-5 rounded-e-full bg-slate-600 hover:bg-slate-700 dark:hover:bg-gray-800 group"
                >
                 <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="blue"
                    viewBox="0 0 24 24"
                    strokeWidth={0.75}
                    stroke="yellow"
                    className="size-9"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z"
                    />
                  </svg>
                  <span className="sr-only">Profile</span>
                </Link>
                <div
                  id="tooltip-profile"
                  role="tooltip"
                  className="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-xs opacity-0 tooltip dark:bg-gray-700"
                >
                  Profile
                  <div className="tooltip-arrow" data-popper-arrow></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Rooms
