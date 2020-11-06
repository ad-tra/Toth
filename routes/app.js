const scraper = require("../tasks/scraper");
const express = require('express');
const router = express.Router();
const Article = require("../models/articles");


function midlewareDB(i){
return async (req,res,next)=>{
  await Article.findOne({type: i,  date: req.query.date}, async(err, docs)=>{
    if(!docs){
      try{
          var docs = await scraper.scrape(i, req.query.date)
          await Article.create(docs)
      
        }catch(err){
          console.trace(err)
          res.status(500)
      }
    }if(docs.content == null) res.status(500)
    
  res.send(docs)
  })  
}
}

router.get('/app',  (req, res) =>{res.render('app')})
router.get('/about', (req,res)=>{res.render('about')})

router.get("/articlesOfNote", midlewareDB(0))
router.get("/essaysOpinions", midlewareDB(2))
router.get("/science", midlewareDB(3))
router.get("/history", midlewareDB(4))

module.exports = router;

