import axios from "axios"
const { Readability } = require('@mozilla/readability');
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
import p1 from './p1.json'
import p2 from './p2.json'
import p3 from './p3.json'
import p4 from './p4.json'

const headers = {
    "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
    "accept-language": "en-US,en;q=0.9,ar;q=0.8,fr;q=0.7",
    "cache-control": "max-age=0",
    "sec-ch-ua": "\" Not A;Brand\";v=\"99\", \"Chromium\";v=\"99\", \"Google Chrome\";v=\"99\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\"Windows\"",
    "sec-fetch-dest": "document",
    "sec-fetch-mode": "navigate",
    "sec-fetch-site": "same-origin",
    "sec-fetch-user": "?1",
    "upgrade-insecure-requests": "1",
    "cookie": "modal=dismissed; visid_incap_2706947=0oAGfYOgSomAPDq8mwi2faT2PGIAAAAAQUIPAAAAAABMZHWCAKjkYf6xW0TkgJTO; nlbi_2706947=KaHyKJxKpQhDlgZAcMYjqQAAAADGcI1w+IWT3R9dEStnpNZj; incap_ses_1341_2706947=akLyOs8eYSkt7vyxyzCcEoRYPWIAAAAAVT9maxYvghmYDuYjet16eg==; incap_ses_1353_2706947=4UkFELOVBDmLc/29vdLGErjHP2IAAAAA3mAeNcm7736GuH04VpiwJw==; reese84=3:14dlIde420vZ0cVdHrwsuA==:aDVCZMdpvkbKrkatGBVvVHfw/f4TO5oaXqmFjW0Lh3TgCpmfZRezr9ePJ7NrLU2Y/g+u+zrgOZxmKq8mLbaMIncDXeTDwcRnQx7w7zIvh9dPc5T05zpEUYy7zhDqpONfxKLu4nqD1OGaJvvJvBKtGbSmedqW3fmaCwRk6j+flhD8wrg0RIOr9lD3ieR6gwscDqXPMf/vW2mj3prSHhHBTDTiVFG4zXqHQ1o3zkLslinusVxzBK7+nH+CmY+pRa9HCZDqLEiG2JnkZgZ73J3T0H6xGzg8ruYkaUoOaNxsh79R+/QzADLXrVS3J/wUN8kMg+nDcHwrfBX4ysrQSOkPM7k8EkSkSO2XLo21qlyEfi4OBO4wJAqITHNsMyLdpxxweKFhJyKHeZXXM6ceMLakhqjrj2x9Wj1I4PjAN8aNpfjRTsNTH+BH1OGSl4wYQmeB:myhTfYlXYZMWa9UgjTk0CoK2U6xL7IL9ilkMAYJb0BU=; nlbi_2706947_2147483392=l9UJTv3LKT9UvMhgcMYjqQAAAADlDgu6JIF2/5TYnPTPMap5",
    "Referer": "https://www.aldaily.com/articles-of-note/",
    "Referrer-Policy": "strict-origin-when-cross-origin"
}


async function getArticle(hrefArr){
   for(let i = 0; i < hrefArr.length; i++){
    try{ 
        const {data}  = await axios({
            method: "get",
            url: hrefArr[i],
            headers: headers
        })
        const document = new JSDOM(data,{url: hrefArr[i]}).window.document;
        const article = new Readability(document, {
            serializer: document =>{
                document.querySelectorAll("img, figure, iframe, nav, section").forEach(img => img.parentNode.removeChild(img))
                document.querySelectorAll("a").forEach(el => el.target = "_blank")
                return Array.from(document.querySelectorAll("p")).map(el => "<p>"+ el.innerHTML + "</p>");
            }
        }).parse();
        
        return {
            ...article,
            siteHref: hrefArr[i],
            content: [article.content.slice(0, article.content.length/2), article.content.slice(article.content.length/2)]
        };
        
    }catch(err){
        console.log(err)
    }

   }
   return "l3asba twila"
}

export default async function handler(req, res) {
    
    // const {data}  = await axios({
    //     method: "get",
    //     url: "https://www.aldaily.com/articles-of-note/",
    //     headers: headers
    // }) 
    // if(data.includes("ROBOTS")) throw new Error("🚓🚓 got caught and flagged as a bot by aldaily")
    // //get list of articles of note external links.
    // const document = new JSDOM(data).window.document;
    // const externalLinks = Array.from(document.querySelectorAll(".content-pad p a:last-of-type")).map(el => el.href)
    //const externalLinks = ["https://quadrant.org.au/magazine/2022/01/warhol-the-void-beneath-the-emptiness/","https://www.smithsonianmag.com/smart-news/why-would-two-ordinary-people-steal-a-160-million-willem-de-kooning-painting-180979787/","https://www.laphamsquarterly.org/roundtable/enjoy-my-flames","https://compactmag.com/article/against-right-liberalism","https://www.smithsonianmag.com/history/the-myth-of-agent-355-the-woman-spy-who-supposedly-helped-win-the-revolutionary-war-180979748/","https://harpers.org/archive/2022/04/night-shifts-dream-incubation-technology-sleep-research","https://www.firstthings.com/web-exclusives/2022/03/the-cancellation-of-russian-culture","https://www.washingtonpost.com/magazine/2022/03/14/modern-language-association-convention/","https://www.chronicle.com/article/an-elaborate-new-decorum-has-crept-in","https://thebaffler.com/latest/the-new-neurasthenia-tyson","https://www.thedriftmag.com/vibe-mood-energy/","https://www.washingtonpost.com/books/2022/03/11/russian-cold-war-fiction/","https://www.newstatesman.com/culture/books/2022/03/on-the-road-again-jack-kerouacs-contested-legacy","https://lithub.com/what-makes-a-great-opening-line/","https://inference-review.com/article/the-nature-of-art","https://www.theatlantic.com/culture/archive/2022/03/limits-women-confidence-workplace-inequality/626562/","https://www.thebulwark.com/ayn-rand-in-our-day/","https://aeon.co/essays/why-morality-requires-veganism-the-case-against-owning-animals","https://www.chronicle.com/article/who-owns-your-academic-community","https://theamericanscholar.org/evolutionary-road/","https://www.persuasion.community/p/the-contradictions-of-american-history?s=r","https://peterludlow.medium.com/the-varieties-of-bullshit-5edd5b0aff4e","https://www.neh.gov/article/cult-goethe","https://www.chronicle.com/article/the-frenzied-folly-of-professorial-groupthink","https://www.washingtonpost.com/local/johns-hopkins-curators-examine-musical-mystery-linked-to-edgar-allan-poe/2022/02/22/6339c0de-93fb-11ec-9596-57e799adb3bd_story.html"]


    let resultArticle = {}  

    switch (req.query.topic) {
        case "literature":
            resultArticle = p1
        break;
        case "science":
            resultArticle = p2
        break;
        case "social-science":
            resultArticle = p3
        break;
        case "history":
            resultArticle = p4
        break;
        default:
            throw new Error("query doesn't mach any profiles")
    
    }

    res.setHeader('Content-Type', 'text/html');
    res.setHeader('charset', 'UTF-8');
    res.send(resultArticle);
  }