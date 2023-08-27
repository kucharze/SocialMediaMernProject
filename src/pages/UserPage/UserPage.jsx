import React, {useState, useEffect} from 'react'
import { useParams } from 'react-router-dom'
import CreatePost from '../../components/CreatePost'
import { useAuth } from '../../contexts/app_context'

function UserPage(props) {
    const id = useParams().id
    const {user} = useAuth()
    const [userName,setUserName] = useState('user')
    const [create,setCreate] = useState(false)
    const [posts, setPosts] = useState(['the','overall','posts','for','this','user'])

  return (
    <div>
      <h1>The user profile for a particular user</h1>
      <h2>The id: {id}</h2>
      {
        (user == 'Zack') && 
        <div>
        <button onClick={()=>{setCreate(!create)}}>Create a new post</button>
        {
          create &&  <CreatePost/>
        }
        </div>
        
      }
     
      <ul>
        {
          posts.map((item)=>{
            return <li><div className='post'>
              {item}
              </div></li>
          })
        }
      </ul>
    </div>
  )
}

export default UserPage
