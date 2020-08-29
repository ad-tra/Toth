
var puppeteer = require('puppeteer');



async function scrape(date){

	const url = `https://www.aldaily.com/archives/${date}`
	const browser = await puppeteer.launch({headless: true});
	const page = await browser.newPage();
	page.setDefaultTimeout(10000)
	await page.goto(url)

	//aldaily page
	await page.waitForXPath("//a[contains(text(),'more')]")
	const tlink = await page.evaluate("document.querySelector('.mobile-front p a').getAttribute('href')")
	const tdiscrp = await page.evaluate("document.querySelector('.mobile-front p').innerText")
	await page.goto(tlink)

	//the article publisher page
	await page.waitForXPath("//p[contains(text(),'the')]")
	var text = ""
	for(let paragraph of await page.$x("//p[string-length() > 100]")){
		text = text+ "<p>" +await page.evaluate(element => element.textContent, paragraph)+ "</p>";
	}

	//returns the scraped article 
	var str = 
		{"content": text,
		"date": date,
		"link": tlink,
		"discrp": tdiscrp.substring(tdiscrp.indexOf("|")+1, tdiscrp.length-9),
		"visibility": "unseen"}
	console.log("success")		
	await browser.close()
	return str;
	
}

module.exports = scrape
