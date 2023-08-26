import React, {useState, useEffect} from 'react'
import { useParams } from 'react-router-dom'

function UserPage(props) {
    const id = useParams().id
    const [user,setUser] = useState('user')
      const [posts, setPosts] = useState(['the','overall','posts','for','this','user'])

  return (
    <div>
      <h1>The user profile for a particular user</h1>
      <h2>The id: {id}</h2>
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
