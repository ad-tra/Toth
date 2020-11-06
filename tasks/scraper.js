const { Readability } = require('@mozilla/readability');
const cheerio = require("cheerio")
const axios = require("axios")
const jsdom = require("jsdom");
const { JSDOM } = jsdom;


function purifyContent(html, articleType){
	return new Promise((resolve,reject)=>{
		var doc = new JSDOM(html), document = doc.window.document;
		let reader = new Readability(document).parse();	
		
		document.documentElement.innerHTML = reader.content
		if (reader.length< 2000)
			reject("X.not long enough");	
		//post pure adjustemnts over result
		try{ 
			document.querySelectorAll('img, figure').forEach((el)=>{el.remove()})
			
			if(articleType == 4){
				var extraStart = [] 
				var el = document.querySelector('#readability-page-1 > div >div');
				while (el = el.previousElementSibling)
					extraStart.push(el);	
				extraStart.forEach((el)=>{el.remove()})
				//removes read more history at the bottom
				document.querySelector('[size = "4"]').remove()
			}
			else {
				if(articleType == 3) 
					document.querySelector('#newsletter-interstitial-div').remove()
			}
		}catch(e){}

		resolve(document.documentElement.innerHTML.replace(/(\t|\n)/g,'')) 
	}).catch((e)=>{return null})
}

function historyProcessDate(date){
	var result = 0 , dates = [26, 17, 36, 22, 7, 23, 13, 24, 17, 18, 17, 35], URLs = ["", "_from_1801", "_from_1851", "_from_1901", "_from_1921", "_from_1941", "_from_1951", "_from_1961", "_from_1966", "_from_1971", "_from_1981", "_from_1991", ]
		
	for (let i = 0; i< dates.length; i++){
	    result = result + dates[i]
	    if(result >= date) {
            result = result - dates[i];
            return {url:`http://www.emersonkent.com/famous_speeches_in_history_date${URLs[i]}.htm`, aIndex: 1 + (date - result)*4}
        }
	}
}


async function fetchHTML(url){
	try{
		const data = await axios.get(url).then(res => res.data);
		return cheerio.load(data);
	}catch(err){}
}

async function scrape(articleType,date){
	switch(articleType) {
		case 3:{
			//science
			var pageQuery = parseInt(date / 16)
			var linkIndex = date -(pageQuery *16)
			var $ = await fetchHTML(`https://www.sciencemag.org/category/biology?page=${pageQuery}`)
		
			var tlink = "https://www.sciencemag.org" + $('.media__headline a').eq(linkIndex).attr('href')
			var tdiscrp = $('.media__headline').eq(linkIndex).text() + $('.media__deck').eq(linkIndex).text();
			
			break;
		}
		case 4:{
			//history
			var processedDate = historyProcessDate(date)
			
			var $ = await fetchHTML(processedDate.url)
			let allLinks = $(`#table5 > tbody > tr:nth-child(${processedDate.aIndex}) > td:nth-of-type(3) > p > font > b > font > a`)

			var tlink = "http://www.emersonkent.com/" + allLinks.eq(0).attr('href')
			
			let temp = $(`#table5 > tbody > tr:nth-child(1) > td:nth-of-type(3)`).text()
			var tdiscrp = allLinks.eq(0).text().replace(/(\t|\n)/g,'') + ": a speech given by " + allLinks.eq(allLinks.length-1).text().replace(/(\t|\n)/g,'') +" and d"+ temp.substring(temp.indexOf('elivered')).replace(/(\t|\n)/g,'') +" on the date of: "+ $('#table5>tbody > tr:nth-child(1) > td:nth-of-type(1) > p').text().replace(/(\t|\n)/g,'')
			break;
		}
		case 0:
		case 2:{
			//aldaily
			var $ = await fetchHTML(`https://www.aldaily.com/archives/${date}`)
			var tlink = $('.mobile-front p a').eq(articleType).attr('href')
			
			var tdiscrp = $('.mobile-front p').eq(articleType).text()
			tdiscrp = tdiscrp.substring(tdiscrp.indexOf("|")+1, tdiscrp.length-9)
			
			break;
		}
		 

	}
	var $ = await fetchHTML(tlink)

	return {"type":articleType,
	"content": $ ==  undefined ? null : await purifyContent($.html(),articleType),
	"date": date,
	"link": tlink,
	"discrp": tdiscrp}
}


module.exports = {
	scrape,
	purifyContent,
	fetchHTML
}
	
