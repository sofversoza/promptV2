import React from 'react'
import '../styles/Navbar.css'
import { Link } from 'react-router-dom'
import { useLogout } from '../hooks/useLogout'
import { IoLogOutOutline } from 'react-icons/io5'

export default function Navbar() {
  const { logout, isPending } = useLogout()

  return (
    <div className="navbar">
      
      

      <div className="prompt-cont">
        <img 
          src={require("../assets/PrmptGray.png")} 
          alt="Prompt logo"
          className="navbar-logo" 
        />
      </div>



      {/* <ul>
        <li className="logo">
          <div className="typewriter-logo">
            <Link to="/"><h1>Prompt</h1></Link>
          </div>
        </li>

        <li className="options">
          <Link>
            {!isPending && <span onClick={logout}>
              Logout <IoLogOutOutline className="nav-icon" /></span> 
            }
            {isPending && <span>Logging out...</span>}
          </Link>
        </li>
      </ul> */}
    </div>
  )
}
