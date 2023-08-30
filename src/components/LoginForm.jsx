import React, {useState} from 'react'

function LoginForm() {
    const [email,setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleSubmit = (e) =>{
        e.preventDefault();
        console.log("Logining in")
    }
  return (
    <div>
      <h1>Or login with an existing account</h1>
      <form onSubmit={handleSubmit}>
        <input name='email' type='email' onChange={(e)=>setEmail(e.target.value)} placeholder='Email'/> <br/>
        <input name='password' type='password' onChange={(e)=>setPassword(e.target.value)} placeholder='password'/><br/>
        <input type='submit' value="Login"/>
      </form>
    </div>
  )
}

export default LoginForm