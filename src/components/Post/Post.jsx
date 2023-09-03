import React from 'react'
import { Link } from 'react-router-dom'
import styles from './Posts.module.css'

function Post({user, post, isUser}) {
  //console.log('Post user',user)

  const handleDelete = () =>{
    console.log("Trying to delete")
  }

  const handleEdit = () =>{
    console.log("Trying to edit")
  }
  return (
    <div className={styles.Post}>
      <Link to={`/User/${user._id}`}><h1>{user && user.screenName}</h1></Link>
      <p>My post: {post.post}</p>
      {
        isUser && <div className='editing'>
          <h3>This only shows up if on the logged in User's page with their posts</h3>
          <button onClick={handleEdit}>To Edit</button>
          <button onClick={handleDelete}>To Delete</button>
          </div>
      }
      
    </div>
  )
}

export default Post
