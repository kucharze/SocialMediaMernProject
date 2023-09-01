import React from 'react'
import { Link } from 'react-router-dom'
import styles from './Posts.module.css'

function Post({user, post, isUser}) {
  console.log('Post user',user)
  return (
    <div className={styles.Post}>
      <h1>A single post</h1>
      <h2>{user && user.screenName}</h2>
      <p>The data as part of the post: {post.post}</p>
      {
        isUser && <div className='editing'>
          <h3>This only shows up if on the logged in User's page with their posts</h3>
          <button>To Edit</button>
          <button>To Delete</button>
          </div>
      }
      
    </div>
  )
}

export default Post
