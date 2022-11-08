import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useSignup } from "../../hooks/useSignup"
import "./Log-Sign.css"

function Signup() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [displayName, setDisplayName] = useState("")
  const [avatar, setAvatar] = useState(null)
  const [avatarError, setAvatarError] = useState(null)
  const { error, isPending, signup } = useSignup()

  const handleSubmit = (e) => {
    e.preventDefault()
    signup(email, password, displayName, avatar)
  }

  const handleFileChange = (e) => {
    setAvatar(null)
    // .files returns an array of files (u can select multiple files but we only want one)
    let selected = e.target.files[0]
    // this shows us different properties for the selected file so we can use them for our if statement below (our checks)
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
    if (selected.size > 100000) {
      setAvatarError("Image file size must be less than 100kb")
      return
    }
    // if none of our checkpoints were triggered and returned an err, this code will run
    setAvatarError(null)
    setAvatar(selected)
    console.log("thumbnail updated successfully")
  }

  return (
    <div className="form">
      <div className="container-items">
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