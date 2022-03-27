import axios from "axios"
import { useEffect, useState } from "react";
export default function PassageContent({topic}) {
  const [content, setContent] = useState({})
  useEffect(async () => {
    const {data} = await axios({
      method: "get",
        url:`/api/passage?topic=${topic}`
      })
      setContent(data)
      console.log(data);
    },[])  
    const choices  = [1,10,11,21,22,31,32,41,42,52]; 
    let i =  parseInt(Math.random()*choices.length)
    
    return (
    <article>
    <section className="article-section">
      <div className="line-num" />
      <div className="article-main">
        <h1 class= "instructions">Questions {choices[i]}-{choices[i+1]} are based on the following passage.</h1>
        <h3 class= "article-intro">This passage is from 
          <a class= "link" target = "_blank" rel="noopener" href = {content.siteHref}> {content.siteName !== null ? content.siteName :new URL(content.siteHref).host}</a> 
        </h3> 
      <p dangerouslySetInnerHTML={{ __html: content.content !== undefined &&  content.content[0].join("") }}></p>
      </div>
    </section>
    <div className="separateur" />
    <section className="article-section">
      <div className="line-num" />
      <div className="article-main" > 
        <p dangerouslySetInnerHTML={{ __html: content.content !== undefined  && content.content[1].join("") }}></p>
      </div>
    </section>
  </article>
  )
}
