
if(localStorage.getItem("theme"))
	document.body.className = localStorage.getItem("theme")
if(localStorage.getItem("accent"))
	document.body.id = localStorage.getItem("accent")

function dateAdd(date, i){
	var newDate=  new Date(new Date(date).getTime() + i*24*60*60*1000);
	return `${newDate.getFullYear()}-${newDate.getMonth()+1}-${newDate.getDate()}`
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


function populateRes(response){
	var article = response.content
	var mid = article.substring(parseInt(article.length/2)).indexOf(" ")+parseInt(article.length/2) 
	var link = new URL(response.link)
	var discrp = response.discrp
	var date = response.date
	var choices = [1,10,11,21,22,31,32,41,42,52]; 
	let i = 2*parseInt(Math.random()*choices.length/2)

	document.querySelectorAll(".article-main")[0].innerHTML = `<h1 class= "instructions">Questions ${choices[i]}-${choices[i+1]} are based on the following passage.</h1><h3 class= "article-intro">This passage is from <a class= "link" target = "_blank" rel="noopener" href = "${link}"> ${link.host}</a> ${discrp} Fetched from adaily.com, on ${date}</h3> ${article.substring(0,mid)}`
	document.querySelectorAll(".article-main")[1].innerHTML = article.substring(mid)
	
	populateLine()
}




function loadArticle(source, n, scroll){
		
	var xhr = new XMLHttpRequest()
	xhr.open("GET", `/${source}?date=${articleDate}`, true)
	xhr.responseType = 'text';
    console.log(document.querySelector(".pagination") != null && scroll)
    if(document.querySelector(".pagination") != null ){
		document.querySelector(".pagination").style.display = "none"
		if(scroll == true)
		document.querySelector(".loader-container").style.display = "inherit"	
		document.querySelector("article").style.display = "none"
    }
	
	if(n == 1 && (new Date(articleDate).getTime() >= new Date(dateAdd(new Date(), -3)).getTime() || articleDate < 0)){
		document.location.href = "/" 
    	articleDateAdd(-1)
    	return null
    }
    else{ 
	xhr.onload = function () {
    	if (xhr.readyState === xhr.DONE) {
        	if (xhr.status === 200 || xhr.status === 304) {
            	
            	var response = JSON.parse(xhr.response)
            	
            	document.querySelector("article").style.display = "flex"
            	populateRes(response)
        		
        		document.querySelector(".loader-container").style.display = "none"
        		document.querySelector(".pagination").style.display = "flex"
        		if(scroll)
        			document.querySelector(".article-main").scrollIntoView({ behavior: 'smooth', block: 'start'})
        	}
    		
    		if(xhr.status === 500){
   
    				articleDateAdd(n)
    				loadArticle(source, n)
    		}
    	}
	};
	
	xhr.send()
	}
}

var articleSource = localStorage.getItem("articleSource") || "articlesOfNote";
localStorage.setItem("articleSource", articleSource)


var articleDates = localStorage.getItem("articleDates") || JSON.stringify({"articlesOfNote" : `${dateAdd(new Date(), -3)}`, "essaysOpinions" : `${dateAdd(new Date(), -3)}` , "science" : "0"})
localStorage.setItem("articleDates", articleDates)

var articleDate = JSON.parse(articleDates)[articleSource]

function articleDateAdd(n){
	if(articleSource == "science"){
		articleDate = parseInt(articleDate) + n*-1
	}
	else
		articleDate = dateAdd(articleDate, n)
	
	let obj = JSON.parse(localStorage.getItem("articleDates"))
	obj[articleSource] = articleDate
	
	localStorage.setItem("articleDates", JSON.stringify(obj))
	articleDates  = localStorage.getItem("articleDates")
console.log(localStorage)
}

