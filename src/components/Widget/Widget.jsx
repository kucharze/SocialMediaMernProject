import React,{useEffect, useState} from 'react'
import axios from 'axios'
import styles from './Widget.module.css'

function Widget() {
    const [articles, setArticles] = useState(null)

    const searchNews = async () =>{
        //Search for news articles based on a search term
        let api = `https://newsdata.io/api/1/news?apikey=pub_2895793afb243b410546a59b35c08cc383271&q=weather`
        let res = await axios.get(api)
        console.log(res.data)
        setArticles(res.data.results)
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
                <h2>{item.description}</h2>
                {/* <a href={item.url}>See link</a> */}
                </div>
                
            })
        }
    </div>
  )
}

export default Widget
