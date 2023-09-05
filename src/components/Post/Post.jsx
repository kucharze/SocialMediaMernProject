import React, {useState} from 'react'
import { Link } from 'react-router-dom'
import styles from './Posts.module.css'
import axios from 'axios'

const BASE_URL_POSTS = "http://localhost:3001/posts";

function Post({user, post, isUser}) {
  //console.log('Post user',user)
  const [savedPost, setSavedPost] = useState(post)
  const [postDesc, setPostDesc] = useState(post ? post.post : null)
  const [id,setId] = useState(post ? post._id : null)
  const [disabled, setDisabled] = useState(false)
  //console.log("post is ", post)

  const handleDelete = async () =>{
    
    try {
      console.log("Trying to delete")
      let res = await axios.delete(`${BASE_URL_POSTS}/delete/${id}`);
      console.log("Delete res is ",res.data)
      if(res.status === 200){
        setPostDesc("This post has been deleted")
        setDisabled(true)
      }
    } catch (error) {
      console.log("Error trying to delete a post")
    }
    
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
      <Link to={`/User/${user._id}`}><h1>{user && user}</h1></Link>
      <p>{postDesc}</p>
      {
        isUser && <div className='editing'>
          <button className={styles.btn} disabled={disabled} onClick={handleEdit}>To Edit</button>
          <button className={styles.btn} disabled={disabled} onClick={handleDelete}>To Delete</button>
          </div>
      }
      
    </div>
  )
}

export default Post
