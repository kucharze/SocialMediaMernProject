import React from 'react'

function Post({user, post, isUser}) {
  return (
    <div>
      <h1>A single post</h1>
      <h2>The user</h2>
      <p>The data as part of the post: {post}</p>
      <button>To Delete if this belongs to the logged in user</button>
    </div>
  )
}

export default Post
