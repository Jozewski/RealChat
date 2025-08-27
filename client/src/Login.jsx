/* eslint-disable no-unused-vars */
import { Link } from "react-router";
import { useState, useEffect } from "react"
import { useNavigate } from "react-router"
import { login } from "./auth/authService.js"

const Login = () => {
  const navigate = useNavigate()
  
  const [ loginForm, setLoginForm ] = useState({ email: "", password: "" })
  const [ loading, setLoading ] = useState(false)

  // If user is logged in, rediredt to home page
  useEffect(() => {
    const token = sessionStorage.getItem("token")
    if (token) {
      navigate("/")
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  
  const handleSubmit = async (e) => {
    e.preventDefault()

    // Validation
    if (loginForm.email === "" || loginForm.password === "") {
      // Show error message/styling
      console.log("form error")
    }
    else {
      // Service call to login
      const checkLogin = await login(loginForm)
      if (checkLogin.success && checkLogin.token) {
        sessionStorage.setItem("token", checkLogin.token)
        navigate("/dashboard")
      }
    }

  }



    return (
        <>
        <div className="bg-slate-300 sm:py-26">
       
         <div className=" md:w-1/2 xl:w-2/5 2xl:w-2/5 3xl:w-1/3 mx-auto p-8 md:p-10 2xl:p-12 3xl:p-14 bg-slate-500 rounded-2xl shadow-xl">
        <div className="flex flex-row gap-3 pb-4">
            <div>
                <img src="/favicon.ico" alt="Logo" width="50"/>
            </div>
            
             <h1 className="text-5xl font-bold text-[#111827] text-[#111827] my-auto">Real Chat</h1>
    
        </div>
        <div className="text-3x1 font-bold text-[[#111827] pb-8 ">Login to your account.</div>
       
        <form onSubmit={handleSubmit} className="flex flex-col">
            <div className="pb-2">
                <label htmlFor="email" className="block mb-2 text-sm font-medium text-[#111827]">Email</label>
                <div className="relative text-gray-400"><span className="absolute inset-y-0 left-0 flex items-center p-1 pl-3"></span> 
                <input
                  value={loginForm.email}
                  onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })}
                  id="email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 disabled:text-gray-300"
                  disabled={loading}
                />

                </div>
            </div>
            <div className="pb-6">
                <label htmlFor="password" className="block mb-2 text-sm font-medium text-[#111827]">Password</label>
                <div className="relative text-gray-400"><span className="absolute inset-y-0 left-0 flex items-center p-1 pl-3"></span> 
                <input
                  value={loginForm.password}
                  onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                  id="password"
                  name="password"
                  type="password"
                  required
                  autoComplete="current-password"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 disabled:text-gray-300"
                  disabled={loading}
                />

                </div>
            </div>
            <button type="submit" className="w-full bg-[red] text-[#ffffff] font-bold text-base p-3 rounded-lg hover:bg-purple-800 active:scale-95 transition-transform transform">Login</button>
            {/* <div className="text-3x1 font-bold text-[#4B5563] pb-8">Need an account? <a href="#" className="font-bold text-[#766ffa] hover:underline">Sign Up</a>
    
            </div> */}
        </form>
        <div className="relative flex py-8 items-center">
            <div className="flex-grow border-t border-[1px] border-gray-200"></div> <span className="flex-shrink mx-4 font-bold text-gray-800">OR</span> 
            <div className="flex-grow border-t border-[1px] border-gray-200"></div>
        </div>
        <form>
            <div className="flex flex-row gap-2 justify-center">
            <Link to="/" className="flex pt-10">
                <button className="w-full bg-[red] text-[#ffffff] font-bold text-base p-3 rounded-lg hover:bg-purple-800 active:scale-95 transition-transform transform">
                    <span className="font-medium mx-auto">Home</span>
    
                </button>
                </Link>
            </div>
        </form>       
       </div>
       </div>
           
   </>
 )
}

export default Login;
