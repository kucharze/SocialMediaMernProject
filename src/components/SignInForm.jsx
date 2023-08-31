import React, {useState} from 'react'
import { useAuth } from '../contexts/app_context'

function SignInForm() {
    const {postData} = useAuth()
    const [screenName, setScreenName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirm, setConfirm] = useState('')

    const handleSubmit = (e) =>{
        e.preventDefault()
        console.log("Submitting")
        postData({screenName, email, password,confirm, posts: []})
    }
  return (
    <div>
    <h1>Create a new account</h1>
      <form onSubmit={handleSubmit}>
        <input name='screenname' type='text' onChange={(e)=>setScreenName(e.target.value)} placeholder='Screen Name'/> <br/>
        <input name='email' type='email' onChange={(e)=>setEmail(e.target.value)} placeholder='Email'/> <br/>
        <input name='password' type='password' onChange={(e)=>setPassword(e.target.value)} placeholder='password'/><br/>
        <input name='confirm' type='password' onChange={(e)=>setConfirm(e.target.value)} placeholder='password'/><br/>
        <input type='submit' value="Create an Account"/>
      </form>
    </div>
  )
}

export default SignInForm
