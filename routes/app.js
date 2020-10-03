var scraper = require("../scraper.js");
var express = require('express');
var router = express.Router();
var Article = require("../models/articles") 

router.get('/app',  function(req, res) {
  res.render('app')
})


function midlewareDB(i){
return async (req,res,next)=>{
  await Article.findOne({type: i,  date: req.query.date}, async(err, docs)=>{
    if(!docs){
      //scrape it 
      docs = await scraper.scrape(i, req.query.date)
      //save it to db 
     await Article.create(docs)
    }if(docs.content == null){
      res.status(500).send()  
      next()
    } 
    res.send(docs)
  })  
}
}

//router.get(["/articlesOfNote", "/essaysOpinions", "/science"], midlewareDB())
router.get("/articlesOfNote", midlewareDB(0))
router.get("/essaysOpinions", midlewareDB(2))
router.get("/science", midlewareDB(3))

module.exports = router;