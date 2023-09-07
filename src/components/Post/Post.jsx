import React, {useState} from 'react'
import { Link } from 'react-router-dom'
import styles from './Posts.module.css'
import axios from 'axios'
import { useAuth } from '../../contexts/app_context'

// const BASE_URL_POSTS = "http://localhost:3001/posts";
const BASE_URL_POSTS = "/posts";

function Post({user, post, isUser,time, likes, checked}) {
  const {updateLikes} = useAuth()
  const [postDesc, setPostDesc] = useState(post ? post.post : null)
  const [id,setId] = useState(post ? post._id : null)
  const [disabled, setDisabled] = useState(false)
  const [numLikes, setNumLikes]  =useState(likes)
  const [clicked,setClicked] = useState(checked)
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
    //console.log("Trying to edit")
    let pro = prompt("Enter change to prompt")
    //console.log(pro)

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

  const updateLikesAmout = (e)=>{
    console.log(e.target)

      if(e.target.checked){
        console.log("Add like")
        setNumLikes(numLikes+1)
        updateLikes(1,id)
        setClicked(true)
      }
      else{
        // console.log("Remove like")
        // //e.target.checked = false
        // setNumLikes(numLikes-1)
        // updateLikes(-1,id)
        // setClicked(false)
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
          <button className={styles.btn} disabled={disabled} onClick={handleEdit}>To Edit</button>
          <button className={styles.btn} disabled={disabled} onClick={handleDelete}>To Delete</button>
          </div>
      }
      
    </div>
  )
}

export default Post
