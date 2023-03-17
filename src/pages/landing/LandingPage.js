import { useState } from "react"
import "./LandingPage.css"
import Login from "../login-signup/Login"
import Signup from "../login-signup/Signup"

export default function LandingPage() {
  const [showLogin, setShowLogin] = useState(false)
  const [showSignup, setShowSignup] = useState(false)

  return (
    <div className="landing">
      <div className="flexbox-1">
        <div className="logo-cont">
          <img 
            src={require("../../assets/PromptNewWhite.png")} 
            alt="Prompt logo"
            className="landing-logo" 
          />
        </div>

        <div className="message-cont">
          <h2>Elevate your writing <span>&</span></h2>
          <h2>Expand your creativity</h2>
        </div>
      </div>

      <div className="flexbox-2">
        <div className="btn-cont">
          <button onClick={() => setShowLogin(true)}>Get started</button>
          <button onClick={() => setShowSignup(true)}>Join prompt</button>
          {showLogin && 
            <Login setShowLogin={setShowLogin} setShowSignup={setShowSignup}/>
          }
          {showSignup && 
            <Signup setShowSignup={setShowSignup} setShowLogin={setShowLogin}/>
          }
        </div>
      </div>
    </div>
  )
}
