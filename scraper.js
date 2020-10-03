var puppeteer = require('puppeteer');
var { Readability } = require('@mozilla/readability');
var JSDOM = require('jsdom').JSDOM;

//method to purify text form the dom of a publishing website. Needs revision for better effeciancy
function purifyContent(a){

	var doc = new JSDOM(a);
	let reader = new Readability(doc.window.document)
	doc = new JSDOM(reader.parse().content)
	
	var externalities = ["img", "figure", "#newsletter-interstitial-div"] 
	externalities.forEach((externality)=>{
		doc.window.document.querySelectorAll(externality).forEach((e)=>{e.remove()})
	})

	var result = "";
	doc.window.document.querySelectorAll("p").forEach((eP) =>{
		result = result + '<p>' + eP.innerHTML + '</p>'
	})
	return result
}
//articletype=0 (articles of note), 2(essays & opinions), 3(science)
async function scrape(articleType ,date){
	const browser = await puppeteer.launch({headless: true});
	try{
		const page = await browser.newPage();
		page.setDefaultTimeout(15000)

		if(articleType<=2){
			await page.goto(`https://www.aldaily.com/archives/${date}`)
			
			//aldaily page(in the future limit the time wait in order to detect weekends)
			await page.waitForXPath("//a[contains(text(),'more')]")
			var tlink = await page.evaluate(`document.querySelectorAll('.mobile-front p a')[${articleType}].getAttribute('href')`)
			var tdiscrp = await page.evaluate(`document.querySelectorAll('.mobile-front p')[${articleType}].innerText`)
			tdiscrp = tdiscrp.substring(tdiscrp.indexOf("|")+1, tdiscrp.length-9)	

			await page.goto(tlink)			
			//the article's publisher page
			await page.waitForXPath("//p[contains(text(),'the')]")


		}else {
			var pageQuery = parseInt(date / 16)
			var linkIndex = date -(pageQuery *16)

			await page.goto(`https://www.sciencemag.org/category/biology?page=${pageQuery}`)
			
			var tlink = "https://www.sciencemag.org" + await page.evaluate(`document.querySelectorAll('.media__headline a')[${linkIndex}].getAttribute('href')`)
			var tdiscrp = await page.evaluate(`document.querySelectorAll('.media__headline')[${linkIndex}].textContent` )
			tdiscrp = tdiscrp + await page.evaluate(`document.querySelectorAll('.media__deck')[${linkIndex}].textContent` )
			//var date = await page.evaluate(`document.querySelectorAll('time')[1].textContent`)
		
			await page.goto(tlink)
		}
		
		 return {"type":articleType, "content": purifyContent(await page.evaluate(()=>{return document.body.innerHTML;})),"date": date,"link": tlink,"discrp": tdiscrp}
	}
	catch(err){
		return {"type":articleType, "content": null, "date": date}
	}
	finally{
		 await browser.close();
	}
}

module.exports = {
	scrape: scrape
}
	
