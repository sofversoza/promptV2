import { useState } from 'react'
import { useLogin } from "../../hooks/useLogin"
import { HiUserGroup } from "react-icons/hi"

import "./Log-Sign.css"

export default function Login({ setShowLogin, setShowSignup }) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const { error, isPending, login } = useLogin()
  
  const handleSubmit = (e) => {
    e.preventDefault()
    login(email, password)
  }

  const changeModals = () => {
    setShowLogin(false)
    setShowSignup(true)
  }
  
  return (
    <div className="modalBG">
      <div className="modalContent">
        {/* <div className="close-btn">
          <MdOutlineClose onClick={() => setShowLogin(false)} className="form-icon"/>
        </div> */}
        <HiUserGroup className="form-icon"/>
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
          <div className="err-container">
            {error && <div className="error">{error}</div>}
          </div>
          <div className="btn-container">
            {!isPending && <button className="btn">Login</button>}
            {isPending && <button className="btn" disabled>Loading...</button>}
          </div>
        </form>
        <div className="form-info">
          Need to create an account? 
          <span onClick={changeModals}>Join prompt</span>
        </div>
      </div>
    </div>
  )
}
