import React , {useState, useEffect} from 'react'
import Post from '../../components/Post/Post'
import { useAuth } from '../../contexts/app_context'
import axios from 'axios'

const BASE_URL_POSTS = "http://localhost:3001/posts";

function Posts() {
  const [posts, setPosts] = useState(['the','overall','posts','page'])
  //const {loadPosts} = useAuth()

  const loadPosts = async () => {
    try {
      const res = await axios.get(`${BASE_URL_POSTS}`);
      console.log(res);
    } catch (error) {
      console.log("Error loading posts list ", error);
    }
  };

  useEffect(()=>{
    console.log("loading posts",loadPosts)
    loadPosts()
  },[])
  return (
    <div className='postList'>
      <h1>The overall posts page</h1>
      <h2>We will display the last so many posts here</h2>
      <ul className='postDisplay'>
        {
          posts.map((item,i)=>{
            return <li key={i}><div className='post'>
              <Post user={null} post={item} isUser={false}/>
              </div></li>
          })
        }
      </ul>
      
    </div>
  )
}

export default Posts
