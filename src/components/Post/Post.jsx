import React, {useState} from 'react'
import { Link } from 'react-router-dom'
import styles from './Posts.module.css'
import axios from 'axios'

const BASE_URL_POSTS = "http://localhost:3001/posts";

function Post({user, post, isUser}) {
  //console.log('Post user',user)
  const [postDesc, setPostDesc] = useState(post.post)
  const [id,setId] = useState(post._id)
  //console.log("post is ", post)

  const handleDelete = () =>{
    console.log("Trying to delete")
  }

  const handleEdit = async () =>{
    console.log("Trying to edit")
    let pro = prompt("Enter change to prompt")
    console.log(pro)

    let newPost = {...post, post: pro}
    console.log("Newpost is " , newPost)

    try {
      const ax = await axios.put(`${BASE_URL_POSTS}/edit`,{post: newPost, id},{
        headers: {
          "Content-Type": "application/json",
        },
      });

      console.log(ax);

      setPostDesc(pro)
    } catch (error) {
      console.log("we had an edit error ", error._message)
    }
    
  }
  return (
    <div className={styles.Post}>
      <Link to={`/User/${user._id}`}><h1>{user && user.screenName}</h1></Link>
      <p>My post: {postDesc}</p>
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
