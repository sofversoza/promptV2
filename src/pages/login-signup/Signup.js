import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useSignup } from "../../hooks/useSignup"
import { IoCloseCircle } from "react-icons/io5"
import "./Log-Sign.css"

function Signup({ setShowSignup }) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [displayName, setDisplayName] = useState("")
  const [avatar, setAvatar] = useState(null)
  const [avatarError, setAvatarError] = useState(null)
  const { error, isPending, signup } = useSignup()

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(email, password, displayName, avatar)
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
    if (selected.size > 500000) {
      setAvatarError("Image file size must be less than 100kb")
      return
    }
    // if none of our checkpoints were triggered and returned an err, this code will run
    setAvatarError(null)
    setAvatar(selected)
    console.log("thumbnail updated successfully")
  }

  return (
    <div className="modalBG">
      <div className="modalContent">
        <div className="close-btn">
          <IoCloseCircle onClick={() => setShowSignup(false)}/>
        </div>
        <h2>Join prompt.</h2>
        {error && <p>{error}</p>}
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
          <input 
            required
            type="file"
            onChange={handleFileChange}
          />
          {avatarError && <div className="error">{avatarError}</div>}
          {!isPending && <button>Sign up</button>}
          {isPending && <button disabled>Loading...</button>}
          {error && <div className="error">{error}</div>}
        </form>
        <div>
          Already have an account? <Link to="/login">Log In</Link>
        </div>
      </div>
    </div>
  )
}

export default Signup