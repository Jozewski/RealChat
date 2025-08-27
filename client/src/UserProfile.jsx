import { useState, useEffect } from "react"
import axios from "axios"
import { avatar } from "./auth/authService"

const UserProfile = () => {
  const [ avatarFile, setAvatarFile ] = useState(null)

  useEffect(() => {
    console.log(avatarFile)
  }, [avatarFile])
  

  const toBase64 = file => new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result)
    reader.onerror = reject
  })

  // async function Main() {
  //   const file = document.querySelector('#myfile').files[0]
  //   console.log(await toBase64(file))
  // }

  const handleFile = async (e) => {
    console.log("handleFile", e)
    if (e.target.files) {
      const testString64 = await toBase64(e.target.files[0])
      console.log(testString64)
      const token = sessionStorage.getItem("token")
      const avatarResponse = await avatar(token, testString64)
      console.log(avatarResponse)
      setAvatarFile(e.target.files[0]) // Only works for one file
    }
  }

  return (
    <div className="bg-gray-300 py-78"> 

      <label
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        htmlFor="file_input">Upload file</label>
      <input
        onChange={handleFile}
        id="file_input"
        type="file"
        className="block w-1/2 text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" />

    </div>
  )
}

export default UserProfile
