import { useState } from "react"
import "./LandingPage.css"
import { Link } from "react-router-dom"
import Login from "../login-signup/Login"

export default function LandingPage() {
  const [showLogin, setShowLogin] = useState(false)
  const [showSignup, setShowSignup] = useState(false)

  return (
    <div className="landing">
      {/* <h1>Welcome to Prompt.</h1>
      <Link to="/login">Login</Link>
      <Link to="/signup">Join prompt</Link> */}

      {/* <button onClick={() => setShowLogin(true)}>Login</button>
      {showLogin && <Login />} */}

      <h1>Prompt</h1>

    </div>
  )
}
