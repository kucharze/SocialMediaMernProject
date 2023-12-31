import React, {useState, useEffect} from 'react'
import { useLocation, useParams } from 'react-router-dom'
import CreatePost from '../../components/CreatePost/CreatePost'
import { useAuth } from '../../contexts/app_context'
import Post from '../../components/Post/Post'
import styles from './UserPage.module.css'

function UserPage(props) {
  //Page to display a user
    const id = useParams().id
    const [userId, setUserID] = useState(id)
    const {user, searchUser} = useAuth()
    const [userName,setUserName] = useState('user')
    const [userProf,setUserprof] = useState(null)
    const [create,setCreate] = useState(false)
    const [posts, setPosts] = useState(null)
    const [status,setStatus] = useState(false)
    const [empty, setEmpty] = useState(false)
    let count = 0;
    let {pathname} = useLocation()

    const grabUser = async() =>{//Grab the data for a user
      console.log("Bring in data for the current user page we are on")
      const userdata = await searchUser(userId)
      console.log("userdata",userdata)
      setUserName(userdata.user.screenName);
      setUserprof(userdata.user)
      
      if(userdata.posts && userdata.posts.length === 0){
        console.log("No user")
        //setPosts(null)
      }
      //fixPosts(userdata.posts)
      setPosts(userdata.posts)
      //console.log("Current posts",userdata.posts)
      //console.log(posts && posts.length>0)
      if(empty===true){
        empty=false
      }
    }

    let fixPosts = (posts) =>{
      for(let i=0; i<posts.length; i++){
        console.log(posts[i])
      }
    }

    useEffect(()=>{
        console.log("Grabbing from server")
        setUserID(id)

    },[status, id])

    useEffect(()=>{
      grabUser()
    },[userId])

    let check = false
    console.log("Printing a user")
    console.log("Pathname is",pathname)
  return (
    <div key={pathname} className={styles.User}>
      <h1>{userName}'s page</h1>
      {
        (user._id === userId) && 
        <div>
        <button onClick={()=>{setCreate(!create)}}>Create a new post</button>
        {//Should we render logic for creating a post
          create &&  <CreatePost status={status} setStatus={setStatus} />
        }
        </div>
      }
     
      <ul className='postDisplay'>
        {//Are there any posts to render, if so render them
          (posts && posts.length>0) ? 
            !empty ? 
            posts.map((item,i)=>{
              //console.log("This post is " , item)
              //console.log(typeof(item))
             
              if(item!==null){
                 check = false;
                for(let i=0; i<item.likedList.length; i++){
                  //console.log("reference is",item.post.likedList[i])
                  if(item.likedList[i] === user._id){
                    //console.log("This should enter checked")
                    check=true
                  }
                }
                return <li key={i}><div className='post'>
                  <Post user={userProf} post={item} time={item.updatedAt}
                  isUser={user._id === userId} likes={item.likes} checked={check}/>
                  </div></li>
              }
              else{
                count++;
                if(count === posts.length){
                  console.log("Is empty")
                  setEmpty(true)
                }
              }
              
            }) : 
            <h3>This user has no posts to display</h3> : 
          <h3>This user has no posts to display</h3>
        }
      </ul>
    </div>
  )
}

export default UserPage
