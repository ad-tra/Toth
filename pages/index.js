import Head from 'next/head'
import Link from 'next/link'

export default function Home() {
  return (
    <>
      <Head>
        <title>Read SAT Passages - TOTH</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>
        <main id="index" data-barba="container" data-barba-namespace="index">
          <div className="left-panel">
            <h1> Prepare for <br />the SAT Reading<br /></h1>
            <noscript>&lt;h1 style= "visibility: visible;"&gt; Prepare for &lt;br&gt;the SAT Reading&lt;/br&gt;&lt;/h1&gt;</noscript>
            <div className="dash" />
          </div>
          <div className="right-panel">
            <h2 className="medium-text">Become a stronger reader <span> by exposing yourself to challenging SAT passages. </span></h2>
            <noscript>&lt;h2 class = "medium-text" style = "visibility: visible;"&gt;Become a stronger reader &lt;span&gt; by exposing yourself to challenging SAT passages. &lt;/span&gt;&lt;/h2&gt;</noscript>
            <Link href="./literature"><a className="button" >Start Reading</a></Link>
            <div className="button-pattern" />
          </div>
          <div className="pros-container">
            <div className="pro pro1">
              <h3>Practice your reading skills with a rich collection of SAT passages</h3>
              <p>Discover the easy English behind Standardized Tests' verbose sentences and unfamiliar vocabulary. Here at TOTH, you can practice and improve your SAT reading score by reading challenging articles in History, Science, Social Science, and Literature.</p>
            </div>
            <div className="pro-1-thick-dash" />
            <div className="pro-2-thick-dash" />
            <div className="pro pro2">
              <h3>Master the passage before answering the questions</h3>
              <p>TOTH is a reading platform that focuses on understanding the text before diving into the questions. If you have a hard time understanding what the author is talking about, TOTH is perfect for you. You'll get to practice through articles that follow SAT structure and feel.</p>
            </div>
          </div>
          <div className="testo-container">
            <h2>Students love it!</h2>
            <div className="testo">
              <div className="dash" />
              <p className="medium-text">wow this is so helpful!<span>I was looking for something
                like this since, I'm trying to passively study reading for
                2 months before I go in depth, and </span>this is perfect!</p>
            </div>
            <p className="testo-credit  medium-text"><span>u/milly_7</span></p>
            <div className="testo">
              <div className="dash" />
              <p className="medium-text"><span>This is literally </span>a lifesaver.<span> I've struggled with reading for so long now.</span></p>
            </div>
            <p className=" testo-credit medium-text"><span>u/Visual_Plate</span></p>
            <div className="testo">
              <div className="dash" />
              <p className="medium-text"><span>I could never understand what the hell history and science authors are trying to say. But, </span>Toth improved my reading sense.<span> Thank you.</span></p>
            </div>
            <p className=" testo-credit medium-text"><span>Eden Collins</span></p>
            <div className="testo">
              <div className="dash" />
              <p className="medium-text">
                <figure>
                  <audio
                    controls
                    style={{width: '100%'}}
                    src="/great_success.mp3">
                    Your browser does not support the
                    <code>audio</code> element.
                  </audio>
                </figure>

              </p>
            </div>
            <p className=" testo-credit medium-text"><span>Borat</span></p>
          </div>
          <Link href="./literature"><a className="button recall-button" >Start Reading</a></Link>
          <p className="button-recall-disc">Get going, It's free</p>
        </main>
        <footer></footer>
      </div>


    </>
  )
}