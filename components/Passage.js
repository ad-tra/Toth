export default function Passage(){
    return (
        <div>
  <main id="app">
    <div className="container">
      <header id="banner">
        <h1>1</h1><h1>
        </h1><h1>1</h1>
      </header>
      <div className="description-top">
        <h1> Reading Test</h1>
        <h2>65 MINUTES, 52 QUESTIONS</h2>
        <h3>Turn to Section 1 of your answer sheet to answer the questions in this section.</h3>
      </div>
      <div className="description-bottom">
        <h3> DIRECTIONS </h3>
        <h4>Each passage or pair of passages below is followed by a number of questions. After reading 
          each passage or pair, choose the best answer to each question based on what is stated or 
          implied in the passage or passages and in any accompanying graphics (such as a table or graph).</h4>
      </div>
      <section className="loader-container">
        <div className="loader">
          <div className="lds-facebook"><div /><div /><div /></div>
        </div>
        <h2 className="loadTime"> Passage available in 5~10 seconds</h2>
      </section>
      <article>
        <section className="article-section">
          <div className="line-num" />
          <div className="article-main"> 
          </div>
        </section>
        <div className="separateur" />
        <section className="article-section">
          <div className="line-num" />
          <div className="article-main" />
        </section>
      </article>
      <div className="pagination">
        <div className="get-article">
          <a id="back" className="link"> Back</a>
          <h3> Go back to the previous passage</h3>
        </div>	
        <div className="get-article">
          <a id="next" className="link"> Next</a>
          <h3>View another reading passage</h3>
        </div>	
      </div>
    </div>
  </main>
  <footer> </footer>
</div>

    )
}