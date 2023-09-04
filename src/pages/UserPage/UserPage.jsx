import React, {useState, useEffect} from 'react'
import { useParams } from 'react-router-dom'
import CreatePost from '../../components/CreatePost/CreatePost'
import { useAuth } from '../../contexts/app_context'
import Post from '../../components/Post/Post'
import styles from './UserPage.module.css'

function UserPage(props) {
  //Page to display a user
    const id = useParams().id
    const {user, setUser, searchUser} = useAuth()
    const [userName,setUserName] = useState('user')
    const [create,setCreate] = useState(false)
    const [posts, setPosts] = useState(null)
    const [status,setStatus] = useState(false)
    const [empty, setEmpty] = useState(false)
    let count = 0;

    const grabUser = async() =>{//Grab the data for a user
      console.log("Bring in data for the current user page we are on")
      const userdata = await searchUser(id)
      console.log("userdata",userdata)
      setUserName(userdata.user.screenName);
      
      if(userdata.posts && userdata.posts.length === 0){
        console.log("No user")
        //setPosts(null)
      }
      setPosts(userdata.posts)
      console.log("Current posts",posts)
    }

    useEffect(()=>{
        console.log("Grabbing from server")
        grabUser()

    },[status])
    // console.log("Posts is " + posts)

  return (
    <div className={styles.User}>
      <h1>The user profile for a particular user</h1>
      <h2>{userName}</h2>
      {
        (user._id === id) && 
        <div>
        <button onClick={()=>{setCreate(!create)}}>Create a new post</button>
        {//Should we render logic for creating a post
          create &&  <CreatePost status={status} setStatus={setStatus} />
        }
        </div>
      }
     
      <ol className='postDisplay'>
        {//Are there any posts to render, if so render them
          (posts && posts.length>0) ? 
            empty ? 
            posts.map((item,i)=>{
              console.log("This post is " , + item)
              console.log(typeof(item))
              if(item!=null){
                return <li key={i}><div className='post'>
                  <Post user={user} post={item} isUser={user._id === id}/>
                  </div></li>
              }
              else{
                count++;
                if(count === posts.length){
                  console.log("Is empty")
                  setEmpty(true)
                }
              }
              
            }) : <h3>This user currently has no posts to display</h3> : 
          <h3>This user has no posts to display</h3>
        }
      </ol>
    </div>
  )
}

export default UserPage
