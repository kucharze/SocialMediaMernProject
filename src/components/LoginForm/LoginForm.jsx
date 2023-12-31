import React, {useState} from 'react'
import { useAuth } from '../../contexts/app_context'

function LoginForm() {
    //form for loggin in to the site
    const {postLogin} = useAuth()
    const [email,setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error,setError] = useState(false)

    const handleSubmit = async (e) =>{
        e.preventDefault();
        console.log("Logining in",{email,password})
        let res = await postLogin({email,password})
        if(res==="Login failed"){
          setError(true)
        }
    }
  return (
    <div>
      <h1>Already have an account - log in here</h1>
      <form onSubmit={handleSubmit}>
        <input name='email' type='email' onChange={(e)=>setEmail(e.target.value)} placeholder='Email'/> <br/>
        <input name='password' type='password' onChange={(e)=>setPassword(e.target.value)} placeholder='password'/><br/>
        <input type='submit' value="Login"/>
      </form>
      {
        error && <h1>Invalid Credentials</h1>
      }
    </div>
  )
}

export default LoginForm
