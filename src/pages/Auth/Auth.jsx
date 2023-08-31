import React, {useState} from 'react'
// import { useAuth } from '../../contexts/app_context'
import SignInForm from '../../components/SignInForm'
import LoginForm from '../../components/LoginForm'

function Auth() {

  return (
    <div>
      <SignInForm/>
      <LoginForm/>
    </div>
  )
}

export default Auth
