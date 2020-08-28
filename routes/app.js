var scrape = require("../scraper.js")
var express = require('express');
const fs = require('fs')
var router = express.Router();
var articleNum;


router.get('/app',  function(req, res, next) {
  res.render('app')
})



router.get("/test", async (req, res) =>{
  if(req.query.index)
    articleNum = req.query.index
  
  if(articleNum<20){ 

   fs.readFile('./toth.json', 'utf8', (err, jsonString) => {
      try {

        const docs = JSON.parse(jsonString)
        res.send(docs[articleNum])
        //res.render("app", {article: docs[articleNum].content,link: new URL(docs[articleNum].link),date: docs[articleNum].date,discrp: docs[articleNum].discrp})
      } 
      
      catch(err) {
        res.send("Sorry, there was an error: " + err)
        return
      }
    })
  }
  
  else{
    try{ 
    var docs = await scrape(articleNum)
    await res.send(docs)
}
  catch(e){
    res.setHeader('Scraper-Status', 'failed');
    res.status(500).send({ error: "boo:(" });
}
  
  }

})



router.get("/get-article", async(req, res) =>{
  var linkNum = req.query.load || 0

})
module.exports = router;

