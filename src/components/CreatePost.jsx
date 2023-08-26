import React from 'react'

function CreatePost() {
  return (
    <div className='createPost'>
      <h1>This will be the form to create a new post</h1>
      <form>
        <input name='post' type='text'/>
        <input type='submit'/>
      </form>
    </div>
  )
}

export default CreatePost
