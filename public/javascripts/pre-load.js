
if(localStorage.getItem("theme"))
	document.body.className = localStorage.getItem("theme")
if(localStorage.getItem("accent"))
	document.body.id = localStorage.getItem("accent")

function formatDate(date){
	return `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`
}

function dateAddition(date, i){
	var newDate=  new Date(new Date(date).getTime() + i*24*60*60*1000);
	return `${newDate.getFullYear()}-${newDate.getMonth()+1}-${newDate.getDate()}`
}

function populateLine(){ 
var len1 = document.querySelectorAll(".article-main")[0].offsetHeight;
var len2 = document.querySelectorAll(".article-main")[1].offsetHeight;
for(let i = 120; i<len1 + len2; i = i+120){
		
	let num = document.createElement("P")
	num.innerHTML= i/24
	if(i>len1)
		document.querySelectorAll(".line-num")[1].appendChild(num)
	else
		document.querySelectorAll(".line-num")[0].appendChild(num)	
	}
//for the first line number
document.querySelector(".line-num p").style.paddingTop = document.querySelector(".instructions").offsetHeight +  document.querySelector(".article-intro").offsetHeight + 120 + "px"
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
	
	document.querySelectorAll(".line-num").forEach((element) => element.innerHTML ="")
	populateLine()
}




function loadArticle(source, n){
	if(new Date(articleDate).getTime() > new Date(dateAddition(new Date(), -2)).getTime())
    	return "max"
    else			

	var xhr = new XMLHttpRequest()
	xhr.open("GET", `/${source}?date=${articleDate}`, true)
	xhr.responseType = 'text';
    if(document.querySelector(".pagination") != null){
		document.querySelector(".pagination").style.display = "none"
		document.querySelector(".loader-container").style.display = "inherit"	
		document.querySelector("article").style.display = "none"
    }


	xhr.onload = function () {

    	if (xhr.readyState === xhr.DONE) {
        	if (xhr.status === 200 || xhr.status === 304) {
            	
            	var response = JSON.parse(xhr.response)
            	
            	document.querySelector("article").style.display = "flex"
            	populateRes(response)
        		
        		document.querySelector(".loader-container").style.display = "none"
        		document.querySelector(".pagination").style.display = "flex"
        		document.querySelectorAll(".article-main p")[0].scrollIntoView({ behavior: 'smooth', block: 'end'})
        	}
    		
    		if(xhr.status === 500){
    			articleDate = dateAddition(articleDate, n)
    			localStorage.setItem("articleDate" , articleDate)
    			loadArticle(source, n)
    		}
    	}
	};
	xhr.send()
}

var articleSource = localStorage.getItem("articleSource") || "articles-of-note";
localStorage.setItem("articleSource", articleSource)


var articleDate = localStorage.getItem("articleDate") || dateAddition(new Date(), -3)
localStorage.setItem("articleDate", articleDate)


if( document.location.pathname == "/app")
{ 
//loadArticle(articleSource, -1)
if(loadArticle(articleSource, -1) == 'max'){
	articleDate = dateAddition(articleDate, -1)
    localStorage.setItem("articleDate" , articleDate)
}

}