import React,{useEffect, useState} from 'react'
import axios from 'axios'
import styles from './Widget.module.css'

function Widget() {
    const [articles, setArticles] = useState(null)

    const searchNews = async () =>{
        //Search for news articles based on a search term
        let api = `https://newsapi.org/v2/everything?q=weather&from=2023-08-10&sortBy=publishedAt&apiKey=0539d4f171184511b8d1753b9a36dd72`
        let res = await axios.get(api)
        console.log(res.data)
        setArticles(res.data.articles)
    }

    useEffect(()=>{
        console.log("Polling Weather widget")
        searchNews()
    },[])
  return (
    <div className={styles.Weather}>
      <h1>Today's hot topics</h1>
      {
            articles && articles.map((item,i)=>{
              if(item.title!=='[Removed]')
                return <div className={styles.news} key={i}>
                <h1>{item.title}</h1>
                <h2>Info</h2>
                <a href={item.url}>See link</a>
                </div>
                
            })
        }
    </div>
  )
}

export default Widget
