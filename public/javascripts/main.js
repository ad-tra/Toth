var tl = gsap.timeline()
//intro animation for the index page
function indexIntro(){ 
gsap.defaults({duration:1})
tl.from('.left-panel', {autoAlpha:0, y:25, ease:"power3", delay:0.3})
.from('.button-pattern', {autoAlpha:0, y:-50, ease:"power2",delay:0.1},"-=.9")
.from('.button', {autoAlpha:0,x: 50,ease: "power2",delay:0.1},"-=.9")
}
//shorter than intro by 0.5
function indexOutro(){
tl.to('.left-panel', {autoAlpha:0,duration:0.5, y:25, ease:"power3",})
.to('.button',{autoAlpha:0, x:50, duration:0.5,ease:"power2",}, "-=0.5")
.to('.button-pattern', {autoAlpha:0,y: -50,duration:0.5,ease: "power2",}, "-=0.7")

}
//intro animation for the app page
function appIntro(){
tl.from("#banner" ,{duration: 0.6,opacity: 0,y:'-50%'})
tl.from(".description-top, .description-bottom", {duration: 0.6, opacity:0, x:-25, stagger:0.2,}, "=-0.4")
tl.from("article", {duration: 0.6,opacity:0, y: 25}, "=-0.4")
}

function appOutro(){
tl.to("#banner" ,{duration: 0.3, opacity: 0,y:'-25%'})
tl.to(".description-top, .description-bottom", {duration: 0.3,opacity:0, x:-25, stagger:0.2,}, "=-0.5")
tl.to("article", {duration: 0.3,opacity:0, y: 25}, "=-0.5")
}

/*
listens for changes theme mode(dark or light)
*/
if(document.body.className == "dark"){
	document.querySelector("#darkSwitch input").checked = true;
}

var drkModeCheck = document.querySelector("#darkSwitch input")
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

//incase a hard refresh overrides baraba navigation 
if(document.location.pathname =="/app"){
	appContentLoad()
	appIntro()
}
else{
	//for the index page
	indexIntro()
}
function appContentLoad(){
	loadArticle(articleSource, -1, false)
	
	
	/*var lineCheck = document.querySelector("#lineSwitch input")
	lineCheck.addEventListener("click", ()=>{
		if(lineCheck.checked == true){
			document.querySelectorAll(".line-num").forEach((element) => element.innerHTML ="")
		}
		else{
		populateLine()
		
		}
	})*/

	var note = document.getElementById("articlesOfNote")
	var essays = document.getElementById("essaysOpinions")
	var science = document.getElementById("science")

	document.querySelectorAll("#sources li div").forEach((el) =>{
		if(el.id == localStorage.getItem("articleSource")){
			el.className = "link-disabled"
		}
	})

	
	document.querySelectorAll("#sources li div").forEach((el)=>{
		el.addEventListener("click",()=>{ 
			articleSource = el.id
			localStorage.setItem("articleSource", articleSource)
			
			document.title = "Toth - " + articleSource
			el.className = "link-disabled"
			document.querySelectorAll("#sources li div").forEach((ele)=> {
				if(ele.id != el.id) ele.className = "link"})
			articleDate = JSON.parse(articleDates)[articleSource]

			loadArticle(articleSource, -1, false)
		})
	})

	//next button
	document.getElementById("next").addEventListener("click", () =>{
		articleDateAdd(-1)
		loadArticle(articleSource, -1, true)
	})

	document.getElementById("back").addEventListener("click", () => {	
		articleDateAdd(1)
		loadArticle(articleSource, 1, true)
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



barba.init({
	debug: true,
	
	transitions: [{
		from:{
			namespace: ['index']
		},
		enter(){
			appIntro()
			appContentLoad()
		},

		leave(){
			const done = this.async();
			//reverse
			indexOutro()
			 setTimeout(function() {
                done();
            }, 200);
		}		
	},
	{
		from:{
			namespace: ['app']
		},
		 leave(){
			console.log("leave")
			const done = this.async()
			appOutro()
			setTimeout(function() {
                done();
            }, 300);

		},
		enter(){
		indexIntro()
			
		}	
	}

	]
})

