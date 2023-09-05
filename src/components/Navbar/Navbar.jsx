import React from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../../contexts/app_context'
import styles from './Navbar.module.css'

function Navbar() {
  const {user,logout} = useAuth()
  return (
    <div className={styles.navbar}>
      <Link to={`/User/${user._id}`}>{user.screenName}'s page</Link>
      &nbsp;  &nbsp;
      <Link to={`/`}>🏠 Home</Link>
      &nbsp;  &nbsp;
      <Link to={`/News`}>🔍 News</Link>
      &nbsp;  &nbsp;
      <Link to={``} onClick={()=>logout()}>👋 Logout</Link>
    </div>
  )
}

export default Navbar
