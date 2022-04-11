export default function About(){
    return (
        <div className="about-container">
            <p> Hello there, I'm <a href= "https://adtra.me"className="link"> Adam </a>I made TOTH in my senior year of high school because I was bored and because I wanted to apply what I learned in my CS classes.</p>
            <p>Since It was my first programming side project, it was crappy. I didn't know any better. TOTH didn't look bad in terms of UI and UX, but a lot of the logic for fetching content was inconsistent and fragile, which caused random bugs and frequent irritations. Hopefully, now I know a thing or two on how to make a stable site. I'll rewrite TOTH to make it better and smoother. It will help students bypass SAT's agony</p>
            <h2>Live Demo</h2>
            <p>here is a run down of how the TOTH works and how you can use it to prepare for the reading section of the SAT</p>
            <div style={{position: 'relative', marginTop: '1em', paddingBottom: '56.25%', height: 0}}><iframe src="https://www.loom.com/embed/6df7eb7b9aa6433c924d2b8f24019bcb?hide_owner=true&hide_share=true&hide_title=true&hideEmbedTopBar=true" frameBorder={0} webkitallowfullscreen mozallowfullscreen allowFullScreen style={{position: 'absolute', top: 0, left: 0, width: '100%', height: '100%'}} /></div>
            <h2>How I built TOTH</h2>
            <p>I first designed the website on Adobe XD, and then when i was happy with the look and feel of the site, I started development. I used vscode to develop the site.  It currently runs on node.js, Next/React</p>
            <iframe style = {{width: '100%', marginTop: '1em',height: '444px'}}src="https://docs.google.com/presentation/d/e/2PACX-1vQp6SSpqkq5FbVBbk2KXJ8XyXTmIV09i7-uMQ9IvwEK29oYq9I_v8BkWD0gyxDCJMeO4BCwT4_i7V32/embed?start=false&loop=false&delayms=10000" frameBorder={0}  allowFullScreen="true" mozallowfullscreen="true" webkitallowfullscreen="true" />

        </div>
    )
}