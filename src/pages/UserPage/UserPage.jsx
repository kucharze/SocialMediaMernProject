import React, {useState, useEffect} from 'react'
import { useParams } from 'react-router-dom'
import CreatePost from '../../components/CreatePost'
import { useAuth } from '../../contexts/app_context'
import Post from '../../components/Post/Post'

function UserPage(props) {
    const id = useParams().id
    const {user, searchUser} = useAuth()
    const [userName,setUserName] = useState('user')
    const [create,setCreate] = useState(false)
    const [posts, setPosts] = useState(null)

    const grabUser = async() =>{
      console.log("Bring in data for the current user page we are on")
      const userdata = await searchUser(id)
      console.log("userdata",userdata)
      setUserName(userdata.screenName);
      if(userdata.posts.length === 0){
        setPosts(["No data"])
      }
      setPosts(userdata.posts)
      console.log("Current posts",posts)
    }

    useEffect(()=>{
      console.log("Current posts",posts)
      if(user._id !== id){
        console.log("Grabbing from server")
        grabUser()
      }
      else{
        console.log("Grabbing from User var")
        setUserName(user.screenName)
      }
    },[])
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
          create &&  <CreatePost/>
        }
        </div>
      }
     
      <ul className='postDisplay'>
        {
          (posts && posts.length>0) ? posts.map((item,i)=>{
            return <li key={i}><div className='post'>
              <Post user={user} post={item} isUser={user._id === id}/>
              </div></li>
          }) : 
          <h3>This user currently has not made any posts</h3>
        }
      </ul>
    </div>
  )
}

export default UserPage
