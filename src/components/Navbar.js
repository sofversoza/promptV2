import React, { useEffect, useState } from 'react'
import { CgClose, CgMenu } from "react-icons/cg"
import HamburgerMenu from './HamburgerMenu'
import Axios from "axios"
import '../styles/Navbar.css'


export default function Navbar() {
  const [quote, setQuote] = useState("")
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
      <div className="hamburger">
        <HamburgerMenu />
      </div>
      
      <div className="logo-cont">
        <img 
          src={require(`../assets/logos/${logo}`)} 
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
