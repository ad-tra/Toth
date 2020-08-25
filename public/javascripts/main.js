function delay(n) {
    n = n || 2000;
    return new Promise((done) => {
        setTimeout(() => {
            done();
        }, n);
    });
}
async function wait(i, j){
	await new Promise(r => setTimeout(r, i));
	console.log(j)
}
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
function indexOutro(){
tl
.add(function(){
	//document.querySelector(".button").style.color = "var(--accent)"
})
.to(".button",{
	position:"relative",
	left: "0em",
	ease: "circ",
	duration:1
})

.to(".button-pattern", {
	position:'absolute',
	height: "62%",
	ease: "circ",	
	duration: 1
})
.to(".button-pattern", {
	width:"100%",

})

}

//plays intro animation for the index page
//if(window.location.pathname == "/")

//passed to the scrpae(index, url)
var linkIndex = 0



if(window.location.pathname == "/"){
	indexIntro()
}

if(window.location.search.includes("?index") && !window.location.search.includes("?index=-1") )
{
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
document.querySelector(".line-num p").style.paddingTop = document.querySelector(".instructions").offsetHeight +  document.querySelector(".article-intro").offsetHeight + 120 + "px"

document.getElementById("next").addEventListener("click", () => {
	//if index is less than 20
	var fullQuery = window.location.search
	var query = parseInt(fullQuery.split("=")[1])
	if(query<19){ 

		var newQuery = query + 1
		window.location.href = `?index=${newQuery}`;
	}	
	else{

	window.location.href = `get-article?index=0`
	linkIndex++;
	}


})

document.getElementById("back").addEventListener("click", () => {
history.back()
})


}
if(!window.location.search.includes("?index") && window.location.pathname.includes("/app"))
{
document.getElementById("fetch").addEventListener("click", ()=>{
	window.location.href = "app?index=0"})



}


/*barba.init({
        transitions: [
            {
                async leave(data) {
                    const done = this.async();
                    //animation for the index outro 
                    indexOutro()
                    wait(100, 2);
                    done();
                },

                async enter(data) {
                     //animation for the app intro 
                     document.getElementById("get-article").innerText = "hah"
                     indexIntro()
                     wait(100, 3);
                },

                async once(data) {
                     //animation for the index intro 
                     wait(100, 1);
                     indexIntro()
                },
            },
        ],
});
*/









