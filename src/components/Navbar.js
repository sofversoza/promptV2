import React, { useEffect, useState } from 'react'
import Axios from "axios"
import '../styles/Navbar.css'


export default function Navbar() {
  const [quote, setQuote] = useState("")

  const getQuote = () => {
    Axios.get("https://api.themotivate365.com/stoic-quote").then((response) => {
      setQuote(response.data.quote + " — " + response.data.author)
    });
  }

  useEffect(() => {
    getQuote();
  }, []);

  return (
    <div className="navbar">
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
