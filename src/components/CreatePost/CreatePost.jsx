import React, { useState } from 'react'
import { useAuth } from '../../contexts/app_context'
import styles from './CreatePost.module.css'

function CreatePost({status, setStatus}) {//Form for Creating a new psot
  const {createPost} = useAuth()
  const [post,setPost] = useState('')

  const handleSubmit = (e) =>{
    // e.preventDefault()
    createPost(post)//Send post data to function to send to server
    setStatus(!status)
  }
  return (
    <div className={styles.CreatePost}>
      <h1>Post something here</h1>
      <form onSubmit={handleSubmit}>
        <input name='post' type='text' onChange={(e)=>{setPost(e.target.value)}}/>
        <input type='submit'/>
      </form>
    </div>
  )
}

export default CreatePost
