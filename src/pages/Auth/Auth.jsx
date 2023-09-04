import React, {useState} from 'react'
// import { useAuth } from '../../contexts/app_context'
import SignInForm from '../../components/SigninForm/SignInForm'
import LoginForm from '../../components/LoginForm/LoginForm'

function Auth() {

  return (
    <div>
      <SignInForm/>
      <LoginForm/>
    </div>
  )
}

export default Auth
