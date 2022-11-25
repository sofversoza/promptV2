import { useState } from 'react'
import { Link } from "react-router-dom"
import { useLogin } from "../../hooks/useLogin"
import { IoCloseCircle } from "react-icons/io5"

import "./Log-Sign.css"

export default function Login({ setShowLogin }) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const { error, isPending, login } = useLogin()
  
  const handleSubmit = (e) => {
    e.preventDefault()
    login(email, password)
  }
  
  return (
    <div className="modalBG">
      <div className="modalContent">
        <div className="close-btn">
          <IoCloseCircle onClick={() => setShowLogin(false)}/>
        </div>
        <h2>Welcome back</h2>
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
          {!isPending && <button className="btn">Login</button>}
          {isPending && <button className="btn" disabled>Loading...</button>}
          {error && <div className="error">{error}</div>}
        </form>
        <div>
          Need to create an account? <Link to="/signup">Join prompt.</Link>
        </div>
      </div>
    </div>
  )
}
