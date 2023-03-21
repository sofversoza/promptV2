import "../styles/Sidebar.css"
import { useAuthContext } from "../hooks/useAuthContext"
import { NavLink } from "react-router-dom"
import { GiSpellBook } from "react-icons/gi"
import { ImQuill } from "react-icons/im"
import { MdDashboard, MdOutlineSettingsSuggest } from "react-icons/md"
import { VscSettings } from "react-icons/vsc"
import Avatar from "./Avatar"

export default function Sidebar() {
  const { user } = useAuthContext()

  return (
    <div className="sidebar">
      <div className="sidebar-content">

        <div className="user">
          <Avatar src={user.photoURL} />
          <p>Hi {user.displayName}!</p>
          {/* <p>{user.metadata.lastLoginAt}</p> */}
          {/* <p>{user.metadata.lastSignInTime}</p> */}
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
