import { useState, useEffect } from "react"
import "./LandingPage.css"
import Login from "../login-signup/Login"
import Signup from "../login-signup/Signup"

export default function LandingPage() {
  const [showLogin, setShowLogin] = useState(true)
  const [showSignup, setShowSignup] = useState(false)
  const [logo, setLogo] = useState("Prompt12W.png")

  const logosArr = [
    "PromptNewWhite.png",
    "Prompt2.png",
    "Prompt3W.png",
    "Prompt4W.png",
    "Prompt5W.png",
    "Prompt6W.png",
    "Prompt7W.png",
    "Prompt8W.png",
    "Prompt9W.png",
    "Prompt10W.png",
    "Prompt11W.png",
    "Prompt12W.png",
    "Prompt13W.png"
  ]

  const loadRandomLogo = () => {
    const randomIndex = Math.floor(Math.random() * logosArr.length)
    const selected = logosArr[randomIndex]
    setLogo(selected)
  }

  useEffect(() => {
    const interval = setInterval(loadRandomLogo, 500)
    return () => clearInterval(interval)
  }, [logo])

  return (
    <div className="landing">
      <div className="flexbox-1">
        <img 
          src={require(`../../assets/logos/${logo}`)} 
          alt="Prompt logo"
          className="landing-logo" 
        />
      </div>
      <div className="flexbox-2">
        {showLogin && 
          <Login setShowLogin={setShowLogin} setShowSignup={setShowSignup}/>
        }
        {showSignup && 
          <Signup setShowSignup={setShowSignup} setShowLogin={setShowLogin}/>
        }
      </div>
      <div className="flexbox-3"></div>
    </div>
  )
}
