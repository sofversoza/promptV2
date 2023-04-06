import "../styles/Sidebar.css"
import { useAuthContext } from "../hooks/useAuthContext"
import { useLogout } from '../hooks/useLogout'
import { Link } from 'react-router-dom'
import { NavLink } from "react-router-dom"
import { GiSpellBook } from "react-icons/gi"
import { TbLogout } from "react-icons/tb"
import { ImQuill } from "react-icons/im"
import { MdDashboard } from "react-icons/md"
import Avatar from "./Avatar"

export default function Sidebar() {
  const { user } = useAuthContext()
  const { logout, isPending } = useLogout()

  return (
    <div className="sidebar">
      <div className="sidebar-content">
        <div className="user">
          <Avatar src={user.photoURL} />
          <p>Hi {user.displayName}!</p>
          <div className="btn-cont">
            <Link>
              {!isPending && <span className='action-btn' onClick={logout}>
                Log off <TbLogout className='icon'/></span>
              }
              {isPending && <span className='action-btn'>Logging off...</span>}
            </Link>
          </div>
        </div>
        <nav className="links">
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
          </ul>
        </nav>
      </div>
    </div>
  )
}
