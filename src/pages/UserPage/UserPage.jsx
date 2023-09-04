import React, {useState, useEffect} from 'react'
import { useParams } from 'react-router-dom'
import CreatePost from '../../components/CreatePost'
import { useAuth } from '../../contexts/app_context'
import Post from '../../components/Post/Post'
import axios from 'axios'

const BASE_URL_POSTS = "http://localhost:3001/posts";

function UserPage(props) {
    const id = useParams().id
    const {user, setUser, searchUser} = useAuth()
    const [userName,setUserName] = useState('user')
    const [create,setCreate] = useState(false)
    const [posts, setPosts] = useState(null)
    const [status,setStatus] = useState(false)

    const grabUser = async() =>{
      console.log("Bring in data for the current user page we are on")
      const userdata = await searchUser(id)
      console.log("userdata",userdata)
      setUserName(userdata.user.screenName);
      
      if(userdata.posts && userdata.posts.length === 0){
        console.log("No user")
        //setPosts(null)
      }
      setPosts(userdata.posts)
      // setPosts(userdata.posts)
      //console.log("Current posts",posts)
      //loadPosts();
    }

    useEffect(()=>{
      // if(user._id !== id){
        console.log("Grabbing from server")
        grabUser()
      // }
      // else{
      //   console.log("Grabbing from User var")
      //   setUserName(user.screenName)
      //   setPosts(user.posts)
      // }
    },[status])
    console.log("Posts is " + posts)
  return (
    <div>
      <h1>The user profile for a particular user</h1>
      <h2>{userName}</h2>
      {/* <h2>The id: {id}</h2> */}
      {
        (user._id === id) && 
        <div>
        <button onClick={()=>{setCreate(!create)}}>Create a new post</button>
        {
          create &&  <CreatePost status={status} setStatus={setStatus} />
        }
        </div>
      }
     
      <ol className='postDisplay'>
        {
          (posts && posts.length>0) ? 
            posts.map((item,i)=>{
              console.log("This post is " , + item)
              console.log(typeof(item))
              if(item!=null){
                return <li key={i}><div className='post'>
                  <Post user={user} post={item} isUser={user._id === id}/>
                  </div></li>
              }
              
            }) : 
          <h3>This user currently has not made any posts</h3>
        }
      </ol>
    </div>
  )
}

export default UserPage
