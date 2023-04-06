import React, { useState } from 'react'
import { useSignup } from "../../hooks/useSignup"
import { HiUserPlus } from "react-icons/hi2"
import "./Log-Sign.css"

function Signup({ setShowSignup, setShowLogin }) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [displayName, setDisplayName] = useState("")
  const [avatar, setAvatar] = useState(null)
  const [avatarError, setAvatarError] = useState(null)
  const { error, isPending, signup } = useSignup()

  const handleSubmit = (e) => {
    e.preventDefault()
    // console.log(email, password, displayName, avatar)
    signup(email, password, displayName, avatar)
  }

  const handleFileChange = (e) => {
    setAvatar(null)
    // .files returns an array of files (u can select multiple files but we only want one)
    let selected = e.target.files[0]
    // shows the different properties for the selected file so we can use them for our if statement below ALSO for our uploadPath in useSignup hook (avatar.name)
    console.log(selected)

    if (!selected) {
      setAvatarError("Please select a file")
      // if we return right here--it'll return OUT of this function meaning none after this first checkpoint will fire bc we're out of the function (handleFileChange) 
      return
    }
    if (!selected.type.includes("image")) {
      setAvatarError("Selected file must be an image")
      return
    }
    if (selected.size > 300000) {
      setAvatarError("Image file size must be less than 300kb")
      return
    }
    // if none of our checkpoints were triggered and returned an err, this code will run
    setAvatarError(null)
    setAvatar(selected)
    console.log("thumbnail updated successfully")
  }

  const changeModals = () => {
    setShowSignup(false)
    setShowLogin(true)
  }

  return (
    <div className="modalBG">
      <div className="modalContent">
        <HiUserPlus className="form-icon" />
        <h2>Join prompt</h2>
        <form onSubmit={handleSubmit}>
          <input 
            required
            type='email' 
            placeholder='Email' 
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
          <input 
            required
            placeholder='Password' 
            type='password' 
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
          <input 
            required
            type="text"
            placeholder="Display name"
            onChange={(e) => setDisplayName(e.target.value)}
            value={displayName}
          />
          <div className="avatar-input">
            <p>Upload an avatar image</p>
            <input 
              required
              type="file"
              onChange={handleFileChange}
            />
          </div>
          <div className="err-container">
            {avatarError && <div className="error">{avatarError}</div>}
            {error && <div className="error">{error}</div>}
          </div>
          <div className="btn-container">
            {!isPending && <button>Sign up</button>}
            {isPending && <button disabled>Loading...</button>}
          </div>
        </form>
        <div className="form-info">
          Already have an account?{" "} 
          <span onClick={changeModals}>Login</span>
        </div>
      </div>
    </div>
  )
}

export default Signup