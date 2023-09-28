import React, {useState} from 'react'
import { Link } from 'react-router-dom'
import styles from './Posts.module.css'
import axios from 'axios'
import { useAuth } from '../../contexts/app_context'
import Comments from '../Comments/Comments'

function Post({user, post, isUser,time, likes, checked}) {
  const {updateLikes, handleDelete, handleEdit} = useAuth()
  const [postDesc, setPostDesc] = useState(post ? post.post : null)
  const [id,setId] = useState(post ? post._id : null)
  const [disabled, setDisabled] = useState(false)
  const [numLikes, setNumLikes]  =useState(likes)
  const [clicked,setClicked] = useState(checked)

  const deletePost = async () =>{
    const returns = await handleDelete(id);
    console.log("Returns:",returns)
    setPostDesc(returns[0])
    setDisabled(returns[1])
  }

  const editPost = async () =>{
    //console.log("Trying to edit")
    let pro = prompt("Enter change to prompt")
    //console.log(pro)

    let newPost = {...post, post: pro}
    console.log("Newpost is " , newPost)

    let result = await handleEdit(newPost, id)

    if(result){
      setPostDesc(pro)
    }

  }

  const updateLikesAmout = (e)=>{
    console.log(e.target)

      if(e.target.checked){
        console.log("Add like")
        setNumLikes(numLikes+1)
        updateLikes(1,id)
        setClicked(true)
      }
      else{
        console.log("No logic")
      }
    
  }

  return (
    <div className={styles.Post}>
      <div className={styles.postTitle}>
        <Link to={`/User/${user._id}`}><h2>{user && user.screenName}</h2></Link>
        <h4>{time}</h4>
      </div>
      
      <p>{postDesc}</p>
      <div className={styles.likes}>
        <input type="checkbox" checked={clicked} onChange={updateLikesAmout} name="likes" id="heart" /> 
        <label htmlFor='heart'> 👍 Likes: {numLikes} </label>
       
      </div>
      {
        isUser && <div className='editing'>
          <button className={styles.btn} disabled={disabled} onClick={editPost}>To Edit</button>
          <button className={styles.btn} disabled={disabled} onClick={() => deletePost()}>To Delete</button>
          </div>
      }
      <Comments disabled = {disabled}/>
    </div>
  )
}

export default Post
