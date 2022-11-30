import { useState } from "react"
import "./LandingPage.css"
import Login from "../login-signup/Login"
import Signup from "../login-signup/Signup"

export default function LandingPage() {
  const [showLogin, setShowLogin] = useState(false)
  const [showSignup, setShowSignup] = useState(false)

  return (
    <div className="landing">
      <div className="typewriter-logo">
        <h1>Prompt</h1>
      </div>
      <div className="actions">
        <button onClick={() => setShowLogin(true)}>Login</button>
        <button onClick={() => setShowSignup(true)}>Sign up</button>
        {showLogin && <Login setShowLogin={setShowLogin} setShowSignup={setShowSignup} />}
        {showSignup && <Signup setShowSignup={setShowSignup} setShowLogin={setShowLogin} />}
      </div>
    </div>
  )
}
