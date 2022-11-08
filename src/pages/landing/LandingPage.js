import React from 'react'
import "./LandingPage.css"
import { Link } from 'react-router-dom'

export default function LandingPage() {
  return (
    <div className="landing">
      <h1>Welcome to prompt</h1>
      <Link to="/login">Login</Link>
      <Link to="/signup">Join prompt</Link>
    </div>
  )
}
