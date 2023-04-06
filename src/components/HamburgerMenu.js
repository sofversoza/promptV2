import { useState } from 'react'
import { CgClose, CgMenu } from "react-icons/cg"
import { useAuthContext } from "../hooks/useAuthContext"
import { useLogout } from '../hooks/useLogout'
import { Link } from 'react-router-dom'
import { NavLink } from "react-router-dom"
import { GiSpellBook } from "react-icons/gi"
import { ImQuill } from "react-icons/im"
import { MdDashboard } from "react-icons/md"
import { VscSettings } from "react-icons/vsc"
import Avatar from "./Avatar"
import "../styles/HamburgerMenu.css"

export default function HamburgerMenu() {
  const [showMenu, setShowMenu] = useState("menu hidden") 
  const { user } = useAuthContext()
  const { logout, isPending } = useLogout()

  return (
    <div className="hamburger-menu">

      <div className="icon-box" onClick={() => setShowMenu("menu visible")}>
        <CgMenu className="menu-icon" />
      </div>
      
      <div className={showMenu}>
        <div className="menu-icon-box">
          <Link>
            {!isPending && <span className='action-btn' onClick={logout}>Log off</span>}
            {isPending && <span className='action-btn'>Logging off...</span>}
          </Link>
          <CgClose className="menu-icon" onClick={() => setShowMenu("menu hidden")} />
        </div>
        <div className="user">
          <Avatar src={user.photoURL} />
          <p>Hi {user.displayName}!</p>
        </div>

        <nav className="links" onClick={() => setShowMenu('menu hidden')}>
          <ul>
            <li>
              <NavLink to="/">
                <GiSpellBook className="sb-icons" />
                <span>Prompts</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/dashboard">
                <MdDashboard className="sb-icons" />
                <span>Dashboard</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/create">
                <ImQuill className="sb-icons" />
                <span>Compose</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/settings">
                <VscSettings className="sb-icons" />
                <span>Settings</span>
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  )
}
