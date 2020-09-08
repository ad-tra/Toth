var scraper = require("../scraper.js");
var express = require('express');
var flatCache = require('flat-cache')
var path = require('path')
var router = express.Router();
var articleDate;


router.get('/app',  function(req, res) {
  res.render('app')
})

function cacheMiddleware(articleSource){

return async (req, res, next)=>{
  let cache = flatCache.load(articleSource, path.join('./cache'))
  let key = req.query.date
  let cacheContent = cache.getKey(key);
  if(cacheContent){
    if(cacheContent == "failed"){
      res.setHeader('Scraper-Status', 'failed');
      res.status(500).send(null);
    }
    else{
      res.send(cacheContent)
    }
  }else{
    res.sendResponse = res.send;
    res.send = (body) =>{
      if(body != null){
        cache.setKey(key, body);
        cache.save(true)
      }else{
        cache.setKey(key, "failed");
        cache.save(true)
      }
      res.sendResponse(body)
    }
    next()
  }
}
}

router.get("/articlesOfNote", cacheMiddleware("articlesOfNote"), async (req, res) =>{
  
  if(req.query.date)
    articleDate = req.query.date
  try{ 
    var docs = await scraper.scrape(0,articleDate)
    await res.send(docs)
  }
  catch(e){
    res.status(500).send(null);
  }
})


router.get("/essaysOpinions", cacheMiddleware("essaysOpinions"), async (req, res) =>{
  
  if(req.query.date)
    articleDate = req.query.date
  try{ 
    var docs = await scraper.scrape(2,articleDate)
    await res.send(docs)
  }
  catch(e){
    res.status(500).send(null);
  }
})

router.get("/science", cacheMiddleware("sciencePassages"), async (req, res) =>{
  
  if(req.query.date)
    articleDate = req.query.date
  try{ 
    var docs = await scraper.scrapeScience(articleDate)
    res.send(docs)
  }
  catch(e){
    res.status(500).send(null);
  }
})

module.exports = router;

