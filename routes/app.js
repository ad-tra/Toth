var scrape = require("../scraper.js");
var express = require('express');
var flatCache = require('flat-cache')
var path = require('path')
var router = express.Router();
var articleDate;


router.get('/app',  function(req, res) {
  res.render('app')
})


let cacheMiddleware = async (req, res, next)=>{
  let cache = flatCache.load('storredPassages', path.join('./cache'))
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

router.get("/get-passage", cacheMiddleware, async (req, res) =>{
  
  if(req.query.date)
    articleDate = req.query.date
  try{ 
    var docs = await scrape(articleDate)
    await res.send(docs)
  }
  catch(e){
    res.setHeader('Scraper-Status', 'failed');
    res.status(500).send(null);
  }
})



router.get("/get-article", async(req, res) =>{
  var linkNum = req.query.load || 0

})
module.exports = router;

