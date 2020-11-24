var tl = gsap.timeline()
//intro animation for the index page
function indexIntro(){ 
	gsap.defaults({duration:1})
	tl
	.from('.left-panel, .right-panel h2', {autoAlpha:0, y:25, ease:"power3", delay:0.3})
	.from('.button-pattern', {autoAlpha:0, y:-50, ease:"power2",delay:0.1},"-=.9")
	.from('.button', {autoAlpha:0,x: 50,ease: "power2",delay:0.1},"-=.9")
}
//shorter than intro by 0.5
function indexOutro(){
	tl
	.to('.left-panel, .right-panel h2', {autoAlpha:0,duration:0.5, y:25, ease:"power3"})
	.to('.button',{autoAlpha:0, x:50, duration:0.5,ease:"power2",}, "-=0.45")
	.to('.button-pattern', {autoAlpha:0,y: -50,duration:0.5,ease: "power2",}, "-=0.45")

}
//intro animation for the app page
function appIntro(){
	tl
	.from("#banner, .description-top, .description-bottom" ,{duration: 0.6,opacity: 0, x: -20})
	.from("article", {duration: 0.5,opacity:0, x: 5}, "-=0.4")

}

function appOutro(){
	tl
	.to("#banner" ,{duration: 0.3, opacity: 0,y:'-25%'})
	.to(".description-top, .description-bottom", {duration: 0.3,opacity:0, x:-25, stagger:0.2,}, "=-0.5")
	.to("article", {duration: 0.3,opacity:0, y: 25}, "=-0.5")
}





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
	appIntro()
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

console.log('%cHello there: made by Adam Trabelsi', 'font-size: 17px;');
barba.init({
	transitions: [{
		from:{namespace: ['index']},
		enter(){
			appIntro()
			appContentLoad()
		},
		leave(){
			const done = this.async();
			indexOutro()
			 setTimeout(function() {
                done();
            }, 200);
		}		
	},
	{
		from:{namespace: ['app']},
		enter(){
			indexIntro()
		},
		leave(){
			const done = this.async()
			appOutro()
			setTimeout(function() {
                done();
            }, 200);
		}	
	}

	]
})
