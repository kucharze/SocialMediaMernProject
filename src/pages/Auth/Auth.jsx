import React, {useState} from 'react'
// import { useAuth } from '../../contexts/app_context'
import SignInForm from '../../components/SigninForm/SignInForm'
import LoginForm from '../../components/LoginForm/LoginForm'
import k from "../../K 2.JPG";

function Auth() {

  return (
    <div>
      <img src={k} alt="" className="logopic" />
      <SignInForm/>
      <LoginForm/>
    </div>
  )
}

export default Auth
