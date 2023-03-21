import React from 'react'
import '../styles/Navbar.css'
import { Link } from 'react-router-dom'
import { useLogout } from '../hooks/useLogout'


export default function Navbar() {
  const { logout, isPending } = useLogout()

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
        <p>"Lorem ipsum dolor sit amet consectetur amet, Lorem ipsum dolor sit amet consectetur ametLorem ipsum dolor sit amet consectetur amet Lorem ipsum dolor sit amet consectetur amet"</p>
      </div>

    </div>
  )
}
