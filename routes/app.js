var scrape = require("../scraper.js")
var express = require('express');
const fs = require('fs')
var router = express.Router();
var articleNum;






router.get('/app',  function(req, res, next) {
  //var db = req.db
  //var collection = db.get("articles")
  var articleNum = req.query.index || -1
  if(articleNum <0)
    res.render("app")
  else if(articleNum <20){ 
      

  fs.readFile('./toth.json', 'utf8', (err, jsonString) => {
    try {
      const docs = JSON.parse(jsonString)
       res.render("app", {article: docs[articleNum].content,link: new URL(docs[articleNum].link),date: docs[articleNum].date,discrp: docs[articleNum].discrp})
       } 
    catch(err) {
        res.send("Sorry, there was an error: " + err)
        return
    }
})

      /* mongodb 
      collection.find({},{}, (e, docs)=>{
      res.render("app", {article: docs[articleNum].content,link: new URL(docs[articleNum].link),date: docs[articleNum].date,discrp: docs[articleNum].discrp})})*/
    
    }
  else{
    res.redirect("/app?index=19")
  
  }    
    
  })

router.get("/get-article", async(req, res) =>{
  var linkNum = req.query.index || 0
  try{ 
  var docs = await scrape(linkNum, "https://www.aldaily.com/essays-and-opinions/")
  res.render("app", {article: docs.content,link: new URL(docs.link),date: docs.date,discrp: docs.discrp})
}
catch{
  res.send("error")
}
})


module.exports = router;

