var monk = require('monk');
var db = monk('localhost:27017/toth')
var puppeteer = require('puppeteer');

async function scrape(i,url){

	const browser = await puppeteer.launch({headless: true});
	const page = await browser.newPage();
	await page.goto(url)
	

		const links = await page.$x("//a[contains(text(),'more')]")
		await page.waitForXPath("//a[contains(text(),'more')]")

		var dates = await page.$x("//a[contains(text(),',')]")
		var tdate = await page.evaluate(element => element.textContent, dates[i]);
		var tlink = await page.evaluate(element => element.getAttribute('href'), links[i])

		var discrps = await page.$x("//p")
		var tdiscrp = await page.evaluate(element => element.textContent, discrps[i])
		await links[i].click()
		

		try{
			await page.waitForXPath("//p[contains(text(),'the')]")
			
			var text = ""
			for(let i of await page.$x("//p[string-length() > 100]")){
				text = text+ "<p>" +await page.evaluate(element => element.textContent, i)+ "</p>";
			}

			//Register var=text to a database if it doesm't already exists
			var str = 
			{"content": text,
			"date": tdate,
			"link": tlink,
			"discrp": tdiscrp.substring(tdiscrp.indexOf("|")+1, tdiscrp.length-9),
			"visibility": "unseen"}
			
			console.log(`Downloaded Page ${i}'s Article ...`)

			return str;
		}
		catch(e){
			console.error(`Failed to Load Page ${i} => error: ${e}`)
		}
		
		await page.goto(url)
		
	
await browser.close()	
}


module.exports = scrape
