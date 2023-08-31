import React from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../../contexts/app_context'

function Navbar() {
  const {user} = useAuth()
  return (
    <div className='navbar'>
      <Link to={`/User/${user._id}`}>{user.screenName}'s page</Link>
      &nbsp; | &nbsp;
      <Link to={`/`}>Main posts thread</Link>
      &nbsp; | &nbsp;
      <Link to={`/`}>Logout Not currently working</Link>
    </div>
  )
}

export default Navbar
