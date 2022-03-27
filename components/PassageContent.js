import axios from "axios"
import { useEffect, useState, useRef } from "react";
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

    const choicesStart  = [1,11,22,32,42]; 
    const choicesEnd = [10,21,31,41,52]; 
    let i = useRef(parseInt(Math.random()*choicesStart.length)).current 
    
    return (
    <article>
    <section className="article-section">
      <div className="line-num" />
      <div className="article-main">
        <h1 class= "instructions">Questions {choicesStart[i]}-{choicesEnd[i]} are based on the following passage.</h1>
        <h3 class= "article-intro">This passage is from 
          <a class= "link" target = "_blank" rel="noopener" href = {content.siteHref}> {content.siteName !== null ? content.siteName :new URL(content.siteHref).host}</a> 
          . {content.title}
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
