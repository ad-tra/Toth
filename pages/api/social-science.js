import axios from "axios"
const { Readability } = require('@mozilla/readability');
const jsdom = require("jsdom");
const { JSDOM } = jsdom;


const headers = {"user-agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1",}

async function scrapeExternalLink(href){
    const {data}  = await axios({
        method: "get",
        url: href,
        headers: headers
    })
    const document = new JSDOM(data,{url: href}).window.document;
    const article = new Readability(document, {
        serializer: document =>{
            document.querySelectorAll("img, figure, iframe").forEach(img => img.parentNode.removeChild(img))
            return document.innerHTML;
        }
    }).parse();
    console.log(article)
    return article;
}

export default async function handler(req, res) {
    
    const {data}  = await axios({
        method: "get",
        url: "https://www.aldaily.com/articles-of-note/",
        headers: headers
    }) 
    
    //get list of articles of note external links.
    const document = new JSDOM(data).window.document;
    const externalLinks = Array.from(document.querySelectorAll(".content-pad p a:last-of-type")).map(el => el.href)

    let resultArticle = {}
    for(let i = 0; i < externalLinks.length; i++){
        const article = await scrapeExternalLink(externalLinks[i])
        if(article.length < 10000){
            resultArticle = article;
            break;
        }
    }

    res.setHeader('Content-Type', 'text/html');
    res.setHeader('charset', 'UTF-8');
    res.send(resultArticle);
  }