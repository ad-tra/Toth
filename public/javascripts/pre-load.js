
if(localStorage.getItem("theme"))
	document.body.className = localStorage.getItem("theme")
if(localStorage.getItem("accent"))
	document.body.id = localStorage.getItem("accent")

function dateAdd(date, i){
	let newDate = moment(date).add(i,'days')
	if(newDate.day() == 0) i>=0 ? newDate.add(1, 'days') :  newDate.add(-1, 'days')
	return newDate.format('YYYY-MM-DD')
}
function articleDateAdd(n){
	if(articleSource == "science" || articleSource == "history")
		articleDate = parseInt(articleDate) + n*-1
	else{
		articleDate = dateAdd(articleDate, n)
	}
		
	
	let obj = JSON.parse(localStorage.getItem("articleDates"))
	obj[articleSource] = articleDate
	
	localStorage.setItem("articleDates", JSON.stringify(obj))
	articleDates  = localStorage.getItem("articleDates")
}

function populateLine(){ 
//empty existing line numbers 
document.querySelectorAll(".line-num").forEach((element) => element.innerHTML ="")

var len1 = document.querySelectorAll(".article-main")[0].offsetHeight;
var len2 = document.querySelectorAll(".article-main")[1].offsetHeight;
for(let i = 135; i<len1 + len2; i = i+135){
		
	let num = document.createElement("P")
	num.innerHTML= i/27
	if(i>len1)
		document.querySelectorAll(".line-num")[1].appendChild(num)
	else
		document.querySelectorAll(".line-num")[0].appendChild(num)	
	}
//for the first line number adjusting for the article intro 
document.querySelector(".line-num p").style.paddingTop = document.querySelector(".instructions").offsetHeight +  document.querySelector(".article-intro").offsetHeight + 135 + "px"
}



function halfTextFromHTML(textHTML, text){
	let j = 1, counter = 0, midHTML = 0, tempHTML = -1, 
	midText = text.substring(parseInt(text.length/2)).indexOf(" ")+ parseInt(text.length/2) 
	
	while(midHTML>-1){
		midHTML = textHTML.indexOf(text.substring(midText, midText+j))
		
		if(counter > 10) return tempHTML; 
		
		if(tempHTML == midHTML) counter++
		else{
			tempHTML = midHTML
			counter = 0
		}    
	j++
	}
	return midText; 
	
}


function populateArticle(response){
	
	var mid = halfTextFromHTML(response.content, new DOMParser().parseFromString(response.content, "text/html").body.textContent) 

	var link = new URL(response.link)
	var choices = [1,10,11,21,22,31,32,41,42,52]; 
	let i = 2* parseInt(Math.random()*choices.length/2)

	document.querySelectorAll(".article-main")[0].innerHTML = `<h1 class= "instructions">Questions ${choices[i]}-${choices[i+1]} are based on the following passage.</h1><h3 class= "article-intro">This passage is from <a class= "link" target = "_blank" rel="noopener" href = "${new URL(response.link)}"> ${link.host}</a> ${response.discrp}.</h3> ${response.content.substring(0, mid)}`
	document.querySelectorAll(".article-main")[1].innerHTML = response.content.substring(mid)
	
	populateLine()
}




function loadArticle(n, scrollBoolean){
		
	var xhr = new XMLHttpRequest()
	xhr.open("GET", `/${articleSource}?date=${articleDate}`, true)
	//replace this by animation that shows loader animation regardless of scroll conditions
	// attach a delay to unhamper visuals when article is cached 
		document.querySelector(".pagination").style.display = "none"
		document.querySelector(".loader-container").style.display = "inherit"	
		document.querySelector("article").style.display = "none"

	xhr.onload = function () {
    	if (xhr.readyState === 4) {
        	if (xhr.status === 200) {
            	
            	var response = JSON.parse(xhr.response)
            	
            	document.querySelector("article").style.display = "flex"
            	populateArticle(response)
        		
        		//outro animeation 
        		document.querySelector(".loader-container").style.display = "none"
				document.querySelector(".pagination").style.display = "flex" 
				
				document.querySelector('article').querySelectorAll('a').forEach((el)=>{el.setAttribute('target', '_blank')})       			
			
			}else{
    			articleDateAdd(-1)
    			loadArticle(n,scrollBoolean)
    		}
    	}
	};
	
	xhr.send()
    if(scrollBoolean){
        setTimeout(()=>{
        	document.querySelector(".article-main").scrollIntoView({ behavior: 'auto',inline: 'nearest', block: 'start'})
        },100)
    }
}

var articleSource = localStorage.getItem("articleSource") || "history";
localStorage.setItem("articleSource", articleSource)

var articleDates = localStorage.getItem("articleDates") || JSON.stringify({"articlesOfNote" : `${dateAdd(new Date(), -3)}`, "essaysOpinions" : `${dateAdd(new Date(), -3)}` , "science" : "0", "history": "16"})
localStorage.setItem("articleDates", articleDates)

var articleDate = JSON.parse(articleDates)[articleSource]



