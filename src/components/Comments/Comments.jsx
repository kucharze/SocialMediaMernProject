import React, {useState } from 'react'
import styles from './Comments.module.css'

function Comments({disabled,commentList}) {

  console.log(commentList)
  return (
    <div>
      <h4>Comments functionality currently in development</h4>
      <button disabled={disabled} className={styles.comments}>Show Comments</button>
    </div>
  )
}

export default Comments
