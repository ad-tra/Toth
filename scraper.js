
var puppeteer = require('puppeteer');

function calci(linkNum){
	var page = parseInt(linkNum/26)
	var result =  linkNum -(page*26)
	return [result, page+1]
}

async function scrape(i){

	const linkNum = calci(i)[0]
	const url = `https://www.aldaily.com/essays-and-opinions/?page=${calci(i)[1]}`
	const browser = await puppeteer.launch({headless: true});
	const page = await browser.newPage();
	await page.goto(url)
	page.setDefaultTimeout(10000)

		const links = await page.$x("//a[contains(text(),'more')]")
		await page.waitForXPath("//a[contains(text(),'more')]")

		var dates = await page.$x("//a[contains(text(),',')]")
		var tdate = await page.evaluate(element => element.textContent, dates[linkNum]);
		var tlink = await page.evaluate(element => element.getAttribute('href'), links[linkNum])

		var discrps = await page.$x("//p")
		var tdiscrp = await page.evaluate(element => element.textContent, discrps[linkNum])
		await links[linkNum].click()
		

		
			await page.waitForXPath("//p[contains(text(),'the')]")
			
			var text = ""
			for(let linkNum of await page.$x("//p[string-length() > 100]")){
				text = text+ "<p>" +await page.evaluate(element => element.textContent, linkNum)+ "</p>";
			}

			//Register var=text to a database if it doesm't already exists
			var str = 
			{"content": text,
			"date": tdate,
			"link": tlink,
			"discrp": tdiscrp.substring(tdiscrp.indexOf("|")+1, tdiscrp.length-9),
			"visibility": "unseen"}
			
			console.log(`Downloaded link ${linkNum}, page ${calci(i)[1]}'s  Article ...`)
			await browser.close()
			return str;
		
	
}
module.exports = scrape
