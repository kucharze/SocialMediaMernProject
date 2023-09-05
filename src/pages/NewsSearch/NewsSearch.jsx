import React, {useState} from 'react'
import axios from 'axios'
import styles from './NewsSearch.module.css'

//https://newsapi.org/v2/everything?q=tesla&from=2023-08-04&sortBy=publishedAt&apiKey=API_KEY
function NewsSearch() {
    const[search, setSearch] = useState('')
    const [articles, setArticles] = useState(null)

    const searchNews = async () =>{
        //Search for news articles based on a search term
        let api = `https://newsapi.org/v2/everything?q=${search}&from=2023-08-04&sortBy=publishedAt&apiKey=0539d4f171184511b8d1753b9a36dd72`
        let res = await axios.get(api)
        console.log(res.data)
        setArticles(res.data.articles)
    }
  return (
    <div className={styles.NewsSearch}>
      <h1>News Search</h1>
      <input type='text' value={search} onChange={(e)=>{setSearch(e.target.value)}}/>
      <button className={styles.btn} onClick={searchNews}>Search news</button>

      <div className={styles.info}>
         {
            articles && articles.length == 0 && <h1>No articles found</h1>
        }
        {
            articles && articles.map((item,i)=>{
              if(item.title!='[Removed]')
                return <div className={styles.news} key={i}>
                <h1>{item.title}</h1>
                <h2>Info</h2>
                <p>{item.description}</p>
                <a href={item.url}>See link</a>
                </div>
                
            })
        }
       
      </div>
    </div>
  )
}

export default NewsSearch
