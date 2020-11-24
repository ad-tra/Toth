
//if dark mode is already selected, update ui status && listen to user clicks 
var drkModeCheck = document.querySelector("#darkSwitch input")
if(document.body.className == "dark") drkModeCheck.checked = true;

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
//accent color event listener 
document.getElementById("feeling-lucky").addEventListener("click", () =>{
	var colors = ["blue", "orange", "violet", "green"]
	
	for(let i = 0; i<colors.length; i++)
	{
		if(document.body.id == colors[i]){
			if(i == colors.length-1)
				i = -1;
			document.body.id = localStorage.accent = colors[i+1]
			break;
		}
	}
})

//sources drop disable current source 
document.querySelectorAll("#sources li div").forEach((el) =>{
	if(el.id == localStorage.articleSource)
		el.className = "link-disabled"	
})
//sources drop down listen for click 
	document.querySelectorAll("#sources li div").forEach((el)=>{
		el.addEventListener("click",()=>{ 
			
			document.getElementById(articleSource).className = "link"
			articleSource = el.id
			localStorage.setItem("articleSource", articleSource)
			
			document.title = "Toth - " + articleSource
			el.className = "link-disabled"

			articleDate = JSON.parse(articleDates)[articleSource]
			if(document.location.pathname == "/"){
				document.querySelector(".button").click()
			}
			loadArticle(-1, false)
		})
	})



//incase a hard refresh overrides baraba navigation 
if(document.location.pathname =="/app"){
	appContentLoad()
}
else {
	if(document.location.pathname =="/")indexIntro()
}

function appContentLoad(){
	loadArticle( -1, false)
	
	//next button increase article index by 1
	document.getElementById("next").addEventListener("click", () =>{
		articleDateAdd(-1)
		loadArticle(-1, true)
	})
	//back button subtracts the article index by 1
	document.getElementById("back").addEventListener("click", () => {	
		if(new Date(articleDate).getTime() >= new Date(dateAdd(new Date(), -3)).getTime() || articleDate <= 0){
			document.querySelector(".logo a ").click()
    	}else{
			articleDateAdd(1)
			loadArticle( 1, true)
    }
	})

	//repopulates lines every time user changes window size 
	new ResizeObserver(()=>{
		try{populateLine()}
		catch(e){}}).observe(document.querySelector(".article-main"))
}

console.log('%cHello there: made by Adam ', 'font-size: 10px;');
barba.init({
	transitions: [{
		from:{namespace: ['index']},to:{namespace: ['app']},
		enter(){
			appContentLoad()
		}
	}]
})
