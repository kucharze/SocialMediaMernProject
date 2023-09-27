import React , {useState, useEffect} from 'react'
import Post from '../../components/Post/Post'
import { useAuth } from '../../contexts/app_context'
import styles from './Posts.module.css'

function Posts() {
  const [posts, setPosts] = useState(null)
  const {user,loadPosts} = useAuth()

  const CreatePosts = async () =>{
    let res = await loadPosts()
    
    console.log("res is",res)
    setPosts(res)
    return res
  }

  useEffect(()=>{
    CreatePosts()
  },[])
  
  let check = false
  return (
    <div className={styles.postList}>
      <h1>The zone</h1>
      <ul className={styles.postDisplay}>
        {
          posts ? posts.map((item,i)=>{
            //console.log("This post is",item)
            check = false;
            for(let i=0; i<item.post.likedList.length; i++){
              //console.log("reference is",item.post.likedList[i])
              
              if(item.post.likedList[i] === user._id){
                //console.log("This should enter checked")
                //console.log(item.post.likedList[i],"Is this null",item.post.likedList[i]===null)
                check=true
              }
            }
            return <li key={i}><div className='post'>
              <Post user={item.user} time={item.post.updatedAt}
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
