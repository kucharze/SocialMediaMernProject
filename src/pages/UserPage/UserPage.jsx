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
    const [posts, setPosts] = useState(['the','overall','posts','for','this','user'])

    const grabUser = async() =>{
      console.log("Bring in data for the current user page we are on")
      const userdata = await searchUser(id)
      console.log("userdata",userdata)
      setUserName(userdata.screenName);
    }

    useEffect(()=>{
      if(user._id !== id){
        grabUser()
      }
      else{
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
          posts.map((item,i)=>{
            return <li key={i}><div className='post'>
              <Post user={user} post={item} isUser={user._id === id}/>
              </div></li>
          })
        }
      </ul>
    </div>
  )
}

export default UserPage
