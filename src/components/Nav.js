import React from 'react'
import { NavLink } from 'react-router-dom'
import '../styles/nav.css'

export default function Nav () {
  return (
    <nav className='menu-container'>
      <div className="menu">
        <div className="brand">
          Your Daily News
        </div>
        <div className="links">
          <NavLink className="home-link" to='/' exact activeClassName='active'>
            Home
          </NavLink>
          <NavLink className="add-link" to='/add-news' activeClassName='active'>
            Add News
          </NavLink>
        </div>
      </div>
    </nav>
  )
}
