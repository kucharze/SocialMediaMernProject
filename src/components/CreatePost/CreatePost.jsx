import React, { useState } from 'react'
import { useAuth } from '../../contexts/app_context'

function CreatePost({status, setStatus}) {//Form for Creating a new psot
  const {createPost} = useAuth()
  const [post,setPost] = useState('')

  const handleSubmit = (e) =>{
    // e.preventDefault()
    createPost(post)//Send post data to function to send to server
    setStatus(!status)
  }
  return (
    <div className='createPost'>
      <h1>This will be the form to create a new post</h1>
      <form onSubmit={handleSubmit}>
        <input name='post' type='text' onChange={(e)=>{setPost(e.target.value)}}/>
        <input type='submit'/>
      </form>
    </div>
  )
}

export default CreatePost
