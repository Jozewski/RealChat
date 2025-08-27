import { Link, useLocation, useNavigate } from "react-router"
import { logout } from "./auth/authService.js"

const Navbar = ({ users }) => {
  let location = useLocation()
  const navigate = useNavigate()
  console.log("location", location)

  const token = sessionStorage.getItem("token")

  const logoutUser = async () => {
    const logoutResponse = await logout()
    console.log("logoutUser logoutResponse")
    if (logoutResponse.success) {
      sessionStorage.clear()
      navigate("/login")
    }
  }

  return (
    <nav className="bg-slate-700 border-gray-200 dark:bg-slate-700">
      <div className="max-w-screen-xl bg-slate-700  flex flex-wrap items-center justify-between mx-auto p-4">
        <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-slate-700  md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-slate-700  dark:bg-slate-700  md:dark:bg-slate-700 dark:border-gray-700">
          <li>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="red"
              viewBox="0 0 24 24"
              strokeWidth=".75"
              stroke="yellow"
              className="size-16"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25"
              />
            </svg>
          </li>
          <li>
            <Link
              to="/"
              className="flex items-center space-x-3 rtl:space-x-reverse"
            >
              <span
                className={`self-center text-3xl font-semibold whitespace-nowrap text-white dark:text-white hover:text-red-700 md:p-0 ${
                  location.pathname === "/"
                    ? "dark:text-red-700"
                    : "dark:text-white"
                } md:dark:hover:text-red-500 dark:hover:dark:text-white dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="red"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="yellow"
                  className="size-8"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 0 1-.825-.242m9.345-8.334a2.126 2.126 0 0 0-.476-.095 48.64 48.64 0 0 0-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0 0 11.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155"
                  />
                </svg>
                Real Chat
              </span>
            </Link>
          </li>
        </ul>

        <div
          className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
          id="navbar-user"
        >
          <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-slate-700 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-slate-700 dark:bg-slate-700 md:dark:bg-slate-700 dark:border-gray-700">
            <li>
              <Link
                to="/dashboard"
                className={`block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent text-white md:hover:text-red-700 md:p-0 ${
                  location.pathname === "/"
                    ? "dark:text-red-700"
                    : "dark:text-white"
                } md:dark:hover:text-red-500 dark:hover:dark:text-white dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700`}
                aria-current="page"
              >
                Dashboard
              </Link>
            </li>
            <li>
              <span>
                <Link
                  to="/rooms"
                  className={`block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent text-white md:hover:text-red-700 md:p-0 ${
                    location.pathname === "/rooms"
                      ? "dark:text-red-700"
                      : "dark:text-white"
                  } md:dark:hover:text-red-500 dark:hover:dark:text-white dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700`}
                  aria-current="page"
                >
                  Rooms
                </Link>
              </span>
            </li>
       

            <li>
              {token ? (
                <span
                  onClick={logoutUser}
                  className={`block py-2 px-3 rounded hover:bg-gray-100 text-white md:hover:bg-transparent md:hover:text-red-700 md:p-0 dark:text-white md:dark:hover:text-red-500 dark:hover:dark:text-white dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700 cursor-pointer`}
                >
                  Logout
                </span>
              )
               : (
                <Link
                  to="/login"
                  className={`block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent text-white md:hover:text-red-700 md:p-0 ${
                    location.pathname === "/login"
                      ? "dark:text-red-700"
                      : "dark:text-white"
                  } md:dark:hover:text-red-500 dark:hover:dark:text-white dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700`}
                >
                  Login
                </Link>
              )
              }
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
