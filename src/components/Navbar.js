import React from 'react'
import '../styles/Navbar.css'
import { Link } from 'react-router-dom'
import { useLogout } from '../hooks/useLogout'
import { AiOutlineLogout } from 'react-icons/ai'

export default function Navbar() {
  const { logout, isPending } = useLogout()

  return (
    <div className="navbar">
      <ul>
        <li className="logo">
          {/* <img src={} alt="logo" /> */}
          <span>prompt.</span>
        </li>

        <li>
          <Link>
            {!isPending && <AiOutlineLogout onClick={logout} style={{ fontSize: 24 }}/>}
            {isPending && <span>Logging out...</span>}
          </Link>
        </li>
      </ul>
    </div>
  )
}
