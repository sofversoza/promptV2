import { useState } from 'react'
import { Link } from "react-router-dom"
import { useLogin } from "../../hooks/useLogin"

import "./Log-Sign.css"

export default function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const { error, isPending, login } = useLogin()
  
  const handleSubmit = (e) => {
    e.preventDefault()
    login(email, password)
  }
  
  return (
    <div className="form">
      <div className="container-items">
        <h2>Login</h2>
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
