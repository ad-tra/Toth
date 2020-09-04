
var puppeteer = require('puppeteer');

async function scrape(articleType ,date){
	const browser = await puppeteer.launch({headless: true});
	try{
		const url = `https://www.aldaily.com/archives/${date}`
		const page = await browser.newPage();
		page.setDefaultTimeout(15000)
		await page.goto(url)

		//aldaily page(in the future limit the time wait in order to detect weekends)
		await page.waitForXPath("//a[contains(text(),'more')]")
		const tlink = await page.evaluate(`document.querySelectorAll('.mobile-front p a')[${articleType}].getAttribute('href')`)
		const tdiscrp = await page.evaluate(`document.querySelectorAll('.mobile-front p')[${articleType}].innerText`)
		await page.goto(tlink)

		//the article's publisher page
		await page.waitForXPath("//p[contains(text(),'the')]")
		var text = ""
		for(let paragraph of await page.$x("//p[string-length() > 100]")){
			text = text+ "<p>" +await page.evaluate(element => element.textContent, paragraph)+ "</p>";
		}

		//returns the scraped article 
		var str = {"content": text,"date": date,"link": tlink,"discrp": tdiscrp.substring(tdiscrp.indexOf("|")+1, tdiscrp.length-9),"visibility": "unseen"}	
		return str;
	}
	finally{
		 await browser.close();
	}
}

async function scrapeScience(unformNum){
	const browser = await puppeteer.launch({headless: true});
	try{
		var pageQuery = parseInt(unformNum / 16)
		var linkIndex = unformNum -(pageQuery *16)
		
		const page = await browser.newPage()
		page.setDefaultTimeout(20000)
		await page.goto(`https://www.sciencemag.org/category/biology?page=${pageQuery}`)

		var tlink = "https://www.sciencemag.org" + await page.evaluate(`document.querySelectorAll('.media__headline a')[${linkIndex}].getAttribute('href')`)
		
		var tdiscrp = await page.evaluate(`document.querySelectorAll('.media__headline')[${linkIndex}].textContent` )
		tdiscrp = tdiscrp + await page.evaluate(`document.querySelectorAll('.media__deck')[${linkIndex}].textContent` )

		var tdate = await page.evaluate(`document.querySelectorAll('time')[1].textContent`)
		
		await page.goto(tlink)
		var text = ""
		for(let paragraph of await page.$x("//div[contains(@class, 'article__body')]/p[not(contains(text(), 'SIGN'))]")){
			var textTemp = await page.evaluate(element => element.innerText, paragraph)
			if(textTemp.indexOf("SIGN") > 0){
				textTemp = textTemp.substring(0,textTemp.indexOf("SIGN"))
			}
			text = text+ "<p>" +textTemp+ "</p>";
		}
		

		var str = {"content": text,"date": tdate,"link": tlink,"discrp": tdiscrp,"visibility": "unseen"}	
		return str;

	}
	finally{
		await browser.close()
	}

}

module.exports = {
	scrape: scrape,
	scrapeScience: scrapeScience
}
