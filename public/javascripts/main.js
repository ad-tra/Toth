//intro animation for the index page
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
	}, "-=0.8")

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
	var note = document.getElementById("note")
	var essays = document.getElementById("essays")
	//changes the source to articles of notes
	note.addEventListener("click",()=>{

		articleSource = "articles-of-note"
		localStorage.setItem("articleSource", "articles-of-note")
		document.title = "Toth - Read Articles of Note"
		note.style.pointerEvents = "none"
		note.style.opacity = "0.6"

		essays.style.pointerEvents = "inherit"
		essays.style.opacity = "1"
		loadArticle(articleSource,-1)
	})
	
	//changes the source to essays and opinions
	essays.addEventListener("click",()=>{
		articleSource = "essays-opinions"
		localStorage.setItem("articleSource", "essays-opinions")
		document.title = "Toth - Read Essays & Opinions"
		
		essays.style.pointerEvents = "none"
		essays.style.opacity = "0.6"

		note.style.pointerEvents = "inherit"
		note.style.opacity = "1"
		loadArticle(articleSource, -1)
	})
	
	

	//next button
	document.getElementById("next").addEventListener("click", nextArticle)

	//back button goes back in history 
	document.getElementById("back").addEventListener("click", () => {
		
		if(articleDate == formatDate(new Date())){
			window.location.href = "/"
		}
		else{
		articleDate = dateAddition(articleDate, 1)
    	localStorage.setItem("articleDate" , articleDate)
		loadArticle(articleSource, 1)
		}

	})

	//repopulates lines every time user changes window size
	var el = document.querySelector(".article-main")
	new ResizeObserver(()=>{
		document.querySelectorAll(".line-num").forEach((element) => element.innerHTML ="")
		try{
			populateLine()
		}
		catch(e){
			console.log("ResizeObserver malfunction")
		}
	}).observe(el)
}


function nextArticle(){
	articleDate = dateAddition(articleDate, -1)
    localStorage.setItem("articleDate" , articleDate)
	loadArticle(articleSource, -1)
	
}










