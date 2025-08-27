
import axios from "axios"

export const login = async ({ email, password }) => {
  console.log("authService login", email, password)
  const response = await axios.post(`${import.meta.env.VITE_API_SERVER_URL}/auth/login`, { email, password })
  console.log("response", response.data)
  return response.data
}
export const status = async (token) => {
  console.log("authService status token", token)
  const response = await axios.get(
    `${import.meta.env.VITE_API_SERVER_URL}/auth/status`,
    { withCredentials: true, headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` }}
  )
  return response.data
}
export const logout = async () => {
  // Get token
  const token = sessionStorage.getItem("token")
  console.log("logout token", token)
  if (token) {
    const response = await axios.post(
      `${import.meta.env.VITE_API_SERVER_URL}/auth/logout`,
      {},
      { withCredentials: true, headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` }}
    )
    console.log("response", response.data)
    // TODO: handle response, navigate
    return response.data
  }
}


export const avatar = async (token, base64Avatar) => {
  console.log("authService status token", token)
  const response = await axios.put(
    `${import.meta.env.VITE_API_SERVER_URL}/users/avatar`,
    { avatar: base64Avatar },
    { withCredentials: true, headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` }}
  )
  return response.data
}
