import "../styles/Sidebar.css"
import { useAuthContext } from "../hooks/useAuthContext"
import { NavLink } from "react-router-dom"
import { GiSpellBook } from "react-icons/gi"
import { ImQuill } from "react-icons/im"
import { MdDashboard, MdOutlineSettingsSuggest } from "react-icons/md"
import Avatar from "./Avatar"

export default function Sidebar() {
  const { user } = useAuthContext()

  return (
    <div className="sidebar">
      <div className="sidebar-content">
        <div className="user">
          <Avatar src={user.photoURL} />
          <p>Hey {user.displayName}!</p>
        </div>

        <nav className="links">
          <ul>
            <li>
              <NavLink to="/">
                <GiSpellBook className="sb-icons" style={{ fontSize:"25" }} />
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
                <MdOutlineSettingsSuggest className="sb-icons" />
                <span>Settings</span>
              </NavLink>
            </li>
          </ul>
        </nav>

      </div>
    </div>
  )
}
