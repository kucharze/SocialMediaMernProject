import React , {useState, useEffect} from 'react'
import Post from '../../components/Post/Post'
import { useAuth } from '../../contexts/app_context'
import axios from 'axios'
import styles from './Posts.module.css'

const BASE_URL_POSTS = "http://localhost:3001/posts";

function Posts() {
  const [posts, setPosts] = useState(null)
  const {user} = useAuth()

  const loadPosts = async () => {
    try {
      const res = await axios.get(`${BASE_URL_POSTS}`);
      console.log("res is ",res.data);
      setPosts(res.data)
    } catch (error) {
      console.log("Error loading posts list ", error);
    }
  };

  useEffect(()=>{
    loadPosts()
  },[])
  
  let check = false
  return (
    <div className={styles.postList}>
      <h1>See what others are posting about</h1>
      <ul className={styles.postDisplay}>
        {
          posts ? posts.map((item,i)=>{
            console.log("This post is",item)
            check = false;
            for(let i=0; i<item.post.likedList.length; i++){
              console.log("reference is",item.post.likedList[i])
              
              if(item.post.likedList[i] === user._id){
                console.log("This should enter checked")
                console.log(item.post.likedList[i],"Is this null",item.post.likedList[i]===null)
                check=true
              }
            }
            return <li key={i}><div className='post'>
              <Post user={item.user.screenName} time={item.post.updatedAt}
              post={item.post} isUser={false}
              likes={item.post.likes} checked={check}/>
              </div></li>
          }) : <h1>Loading....</h1>
        }
      </ul>
      
    </div>
  )
}

export default Posts
