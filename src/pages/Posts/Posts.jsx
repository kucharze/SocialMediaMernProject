import React , {useState} from 'react'
import Post from '../../components/Post/Post'

function Posts() {
  const [posts, setPosts] = useState(['the','overall','posts','page'])
  return (
    <div className='postList'>
      <h1>The overall posts page</h1>
      <h2>We will display the last so many posts here</h2>
      <ul>
        {
          posts.map((item,i)=>{
            return <li key={i}><div className='post'>
              <Post post={item}/>
              </div></li>
          })
        }
      </ul>
      
    </div>
  )
}

export default Posts
