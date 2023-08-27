import React, {useState} from 'react'
import { useAuth } from '../../contexts/app_context'

function Auth() {
  const {postData} = useAuth()

  const handleSubmit = (e) =>{
    e.preventDefault()
    console.log("Submitting")
    postData()
  }
  return (
    <div>
      <h1>Authentication page</h1>
      <form onSubmit={handleSubmit}>
        <input name='email' type='email' placeholder='Email'/>
        <input name='password' type='password' placeholder='password'/>
        <input type='submit'/>
      </form>
    </div>
  )
}

export default Auth
