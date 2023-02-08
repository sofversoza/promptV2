import { useState } from "react"
import "./LandingPage.css"
import Login from "../login-signup/Login"
import Signup from "../login-signup/Signup"

export default function LandingPage() {
  const [showLogin, setShowLogin] = useState(false)
  const [showSignup, setShowSignup] = useState(false)

  return (
    <div className="landing">
      <div className="flex-item-1">
        <div className="logo-cont">
          <img 
            src={require("../../assets/PrmptLogo1.png")} 
            alt="Prompt logo"
            className="landing-logo" 
          />
        </div>
        <div className="message-cont">
          <h2 className="firstmess">Expand your <span>creativity</span>{" "} 
            <span className="ampersand">&</span>
          </h2>
          <h2 className="secondmess">Elevate your writing <span>capabilities</span></h2>
        </div>
      </div>

      <div className="flex-item-2">
        <div className="vision">
          <p>Our vision is to revolutionize the way aspiring writers approach their craft by providing a comprehensive platform for prompt submissions, management, and inspiration.</p>
        </div>
      </div>

      <div className="flex-item-3">
        <button onClick={() => setShowLogin(true)}>Login</button>
        <button onClick={() => setShowSignup(true)}>Join prompt</button>
        {showLogin && <Login setShowLogin={setShowLogin} setShowSignup={setShowSignup} />}
        {showSignup && <Signup setShowSignup={setShowSignup} setShowLogin={setShowLogin} />}
      </div>
    </div>
  )
}
