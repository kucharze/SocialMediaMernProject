import React from 'react'
import { useParams } from 'react-router-dom'

function UserPage(props) {
    const id = useParams().id
  return (
    <div>
      <h1>The user profile for a particular user</h1>
      <h2>The id: {id}</h2>
    </div>
  )
}

export default UserPage
