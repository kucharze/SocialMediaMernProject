import React, { useState } from 'react'
import { useAuth } from '../../contexts/app_context'

function CreatePost({status, setStatus}) {
  const {createPost} = useAuth()

  const [post,setPost] = useState('')

  const handleSubmit = (e) =>{
    e.preventDefault()
    createPost(post)
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
