//intro animatino for the index page
const tl = gsap.timeline()
function indexIntro(){
tl
.from('.background-pattern', {
	opacity: 0,
		duration: 1.3,
		ease: "power1",
})
.to('.left-panel', 
	{
		
		autoAlpha:1,
		duration: 1,
		y: -25, 
		ease: "power3",
		delay:0.3
	}, "-=1.1")

.from('.button-pattern', 
	{
		autoAlpha:0,
		duration: 1,
		y: -50,
		ease: "power2",
	}, "-=.9")

.from('.button', 
	{
		autoAlpha:0,
		duration: 1,
		x: 50,
		ease: "power2",
	}, "-=.9");
}

/*
listens for changes theme mode(dark or light)
*/
if(document.body.className == "dark"){
	document.querySelector(".switch input").checked = true;
}

var drkModeCheck = document.querySelector(".switch input")
drkModeCheck.addEventListener("click", ()=>{
	if(drkModeCheck.checked == true){
		document.body.className = "dark"
		localStorage.setItem("theme", "dark")
	}
	else{
		document.body.className = "light"
		localStorage.setItem("theme", "light")
	}
})

/*
listens for changes in accent colors
*/
var accentCheck = document.getElementById("feeling-lucky")
accentCheck.addEventListener("click", () =>{
	var colors = ["blue", "orange", "violet", "green"]
	for(let i = 0; i<colors.length-1; i++)
	{
		if(document.body.id == colors[colors.length-1]){
			document.body.id = colors[0]
			localStorage.setItem("accent", colors[0])
			break;
		}
		if(document.body.id == colors[i]){
			document.body.id = colors[i+1]
			localStorage.setItem("accent", colors[i+1])
			break;
		}
	}
})



//plays the intro animation if it is the index page
if(window.location.pathname == "/"){
	indexIntro()
}
else
{
	//populates line numbers into the article 
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

	

	/*
	handles events of the next button
	*/
	document.getElementById("next").addEventListener("click", () => {
	//if index is less than 20
	var fullQuery = window.location.search
	var query = fullQuery.split("=")[0]
	var queryValue = parseInt(fullQuery.split("=")[1])
	var newQuery = queryValue + 1
	
	if(queryValue<19 && query == "?index"){ 

		window.location.href = `?index=${newQuery}`;
	}	
	
	else{ 
	if(queryValue == 19) {
		var newQuery =0
	}
    var xhr = new XMLHttpRequest();
    xhr.open('GET', `get-article?load=${newQuery}`)

    if(xhr.readyState == 1){
    	document.querySelector("main").style.display= "none"
		document.querySelector(".loader-container").style.display= "inherit"
    }
    xhr.onerror = function(){
    console.log('Request Error...');
    }
      
    xhr.send();
	window.location.href = `get-article?load=${newQuery}`
	}


})
	//back button goes back in history 
	document.getElementById("back").addEventListener("click", () => {
		history.back()
	})


}










