import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useLogout } from '../hooks/useLogout'
import Axios from "axios"
import '../styles/Navbar.css'


export default function Navbar() {
  const { logout, isPending } = useLogout()
  const [quote, setQuote] = useState("")

  const getQuote = () => {
    Axios.get("https://api.themotivate365.com/stoic-quote").then((response) => {
      // console.log(response)
      setQuote(response.data.quote + " — " + response.data.author)
    });
  }

  useEffect(() => {
    getQuote();
  }, []);

  return (
    <div className="navbar">
      
      <div className="nav-action">
        <Link>
          {!isPending && <span className='action-btn' onClick={logout}>Log out</span>}
          {isPending && <span className='action-btn'>Logging out...</span>}
        </Link>
      </div>

      <div className="logo-cont">
        <img 
          src={require("../assets/PromptNew.png")} 
          alt="Prompt logo"
          className="navbar-logo" 
        />
      </div>

      <div className="quote-cont">
        <p>{quote}</p>
      </div>
    </div>
  )
}
