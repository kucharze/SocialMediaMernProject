import React, {useState, useEffect} from 'react'
import { useParams } from 'react-router-dom'
import CreatePost from '../../components/CreatePost'

function UserPage(props) {
    const id = useParams().id
    const [user,setUser] = useState('user')
    const [create,setCreate] = useState(false)
      const [posts, setPosts] = useState(['the','overall','posts','for','this','user'])

  return (
    <div>
      <h1>The user profile for a particular user</h1>
      <h2>The id: {id}</h2>
      <button onClick={()=>{setCreate(!create)}}>Create a new post</button>
      {
        create &&  <CreatePost/>
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
