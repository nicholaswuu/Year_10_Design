/* –––––––––––––––––––––––––––––––– GENRE SELECTION BOXES ––––––––––––––––––––––––––––––––– */

genres = document.getElementsByClassName("check");
for (genre of genres){
	genre.addEventListener("click", changeSize);
}
check = []
function changeSize(){
	if(this.checked != true){
		this.style.width = "320px"
		this.style.height = "320px"
		this.checked = true;
		check.push(this.id)
	} else{
		this.style.width = "340px"
		this.style.height = "340px"
		this.checked = false;
	}
	for(i in check){
		if(this.checked != true){
			if(check[i] === this.id){
				check.splice(i,1)
			}
		}
	}
	return check
}

function nextPage(){
	if(check[0] == null){
		alert("Error! Please pick a genre!")
	}
	queryString = "?para1=" + check[0];
	for(i=0; i<check.length;i++){
		if(check[1] == null){
			window.location.href = "tablePage.html" + queryString;
		}
		queryString = queryString + "&para" + (i+2) + "=" + check[i+1];
		window.location.href = "tablePage.html" + queryString;
	}
}

/* ––––––––––––––––––––––––––––––––– SEARCH BAR –––––––––––––––––––––––––––––––––– */

document.addEventListener('DOMContentLoaded', function() {
	options = {
		limit: Infinity,
	}
	elems = document.querySelectorAll('.chips');
	instance = M.Chips.init(elems, options);
});
chip = {
	tag: 'chip content',
};


/* –––––––––––––––––––––––––– PARAMETERS FROM LANDING PAGE –––––––––––––––––––––––– */

function landingPageParameters(){
	yearAndDurationOptions()
	queryString = decodeURIComponent(window.location.search);
	queryString = queryString.substring(1);
	queries = queryString.split("&");
	for(i = 0; i < queries.length; i++){
	  	check.push(queries[i].split("=")[1])
	}
	genreSel = document.getElementById('genres')
	genre = []
	artists = []
	yearRange = ""
	for(i=0; i<check.length; i++){
		for (j=0; j<genreSel.options.length; j++) {
			if(check[i] === genreSel.options[j].value){
				genreSel.options[j].selected = true
				genre.push(genreSel.options[j].value)
			}
		}
	}
	console.log(genre)
	loopParameters()
}

/* ––––––––––––––––––––––––– YEAR SELECT –––––––––––––––––––––––––––––– */

function yearAndDurationOptions(){
	sel1year = document.getElementById('year1');
	sel2year = document.getElementById('year2');

	for(i=2020; i>1898; i=i-1){
		opt1year = document.createElement('option');
		opt1year.text = i;
		opt1year.value = i;
		sel1year.add(opt1year);
		opt2year = document.createElement('option');
		opt2year.text = i;
		opt2year.value = i;
		sel2year.add(opt2year);  
	}
	// sel1duration = document.getElementById('time1');
	// sel2duration = document.getElementById('time2');
	// for(i=1; i<31; i++){
	// 	minutes = Math.floor(i/2)
	// 	seconds = Math.floor(i%2*30)
	// 	if(seconds === 0){
	// 		seconds = "00";
	// 	}
	// 	opt1duration = document.createElement('option');
	// 	opt1duration.text = minutes + ":" + seconds;
	// 	opt1duration.value = i;
	// 	sel1duration.add(opt1duration);
	// 	opt2duration = document.createElement('option');
	// 	opt2duration.text = minutes + ":" + seconds;
	// 	opt2duration.value = i;
	// 	sel2duration.add(opt2duration);  
	// }
	elems = document.querySelectorAll('select');
	instances = M.FormSelect.init(elems, options);
}

document.addEventListener('DOMContentLoaded', function() {
	elems = document.querySelectorAll('.tooltipped');
	instances = M.Tooltip.init(elems, options);
});

/* ——————————————————————————— SUBMIT BUTTON ———————————————————————————— */

function submit(){
	genres = document.getElementById('genres')
	genre = [];
	for(i=1; i<genres.options.length; i++){
		if(genres.options[i].selected){
			genre.push(genres.options[i].value)
		}
	}
	elems = document.querySelectorAll('select');
	instances = M.FormSelect.init(elems, options);
	chips = document.getElementsByClassName("chip");
	artists = []
	for(i=0; i < chips.length; i++){
		text = document.getElementsByClassName("chip")[i].textContent
		text = text.substring(0, text.length-5)
		artists.push(text)
	}
	year1 = document.getElementById("year1").options[document.getElementById("year1").selectedIndex].value
	year2 = document.getElementById("year2").options[document.getElementById("year2").selectedIndex].value
	yearRange = year1 + "-" + year2
	// time1 = document.getElementById("time1")
	// time2 = document.getElementById("time2")
	// timevalue1 = parseInt(time1.options[time1.selectedIndex].value)*30000;
	// timevalue2 = parseInt(time2.options[time2.selectedIndex].value)*30000;
	loopParameters()
}
async function loopParameters(){
	console.log(yearRange)
	for(i=0; i<Math.max(genre.length, 1); i++){
		for(j=0; j<Math.max(artists.length, 1); j++){
				if(genre[i]===undefined){
					genre[i] = [""]
				}
				if(artists[j]===undefined){
					artists = [""]
				}
				if(yearRange.length < 9){
					yearRange = ""
				}
				parameters = {
					"artist": artists[j],
					"genre": genre[i],
					"year": yearRange,
					// "duration_ms": timevalue1+"-"+timevalue2
				}
				await addToList(parameters, "track")
				console.log(songList)
		}
	}
	tableStructure()
	display()
}
/* ——————————————————————————— CREATE TABLE ———————————————————————————— */

function tableStructure(){
		oldTable = document.getElementById('results');
		if(oldTable!=null){
			oldTable.parentNode.removeChild(oldTable);
		}
		body = document.getElementsByTagName('center')[0];
  		table = document.createElement('table');
  		table.id = "results";
		thead = table.createTHead();
		row = thead.insertRow();
		row.id = "thead";
		th = document.createElement("th");
	    text = document.createTextNode("");
	    th.style = "width: 75px";
	    th.appendChild(text);
	    row.appendChild(th);
		th = document.createElement("th");
	    text = document.createTextNode("NAME");
	    th.appendChild(text);
	    row.appendChild(th);
	    th = document.createElement("th");
	    text = document.createTextNode("ARTIST");
	    th.appendChild(text);
	    row.appendChild(th);
	    th = document.createElement("th");
	    text = document.createTextNode("ALBUM");
	    th.appendChild(text);
	    row.appendChild(th);
	    th = document.createElement("th");
	    text = document.createTextNode("POPULARITY");
	    th.style = "width: 100px; text-align: center"
	    th.appendChild(text);
	    row.appendChild(th);
	    th = document.createElement("th");
	   	text = document.createTextNode("DURATION");
	    th.style = "width: 150px; text-align: center"
	    th.appendChild(text);
	    row.appendChild(th);
		body.appendChild(table);
}

/* ––––––––––––––––––––––––––––––––– SPOTIFY API –––––––––––––––––––––––––––––––– */

const access_token = ""; //INSERT TOKEN HERE

function getFrom(parameters, type) {
	currentartist = parameters.artist;
	currentyear = parameters.year;
	currentgenre = parameters.genre;
	// currentduration = parameters.duration_ms
	base = "https://api.spotify.com/v1/search?q=";
	first = true;
	if(currentartist!=""){
		if(first==true){
			base+="artist%3A"+currentartist;
			first = false;
		}else{
			base+="%20artist%3A"+currentartist;
		}
	}
	if(currentyear!=""){
		if(first==true){
			base+="year%3A"+currentyear;
			first = false;
		}else{
			base+="%20year%3A"+currentyear;
	}
	}
	if(currentgenre!=""){
		if(first==true){
			base+="genre%3A"+currentgenre;
			first = false;
		}else{
			base+="%20genre%3A"+currentgenre;
		}
	}
	// if(currentduration!="NaN-NaN"){
	// 	if(first==true){
	// 		base+="duration_ms:"+currentduration;
	// 		first = false;
	// 	}else{
	// 		base+="%20duration_ms:"+currentduration;
	// 	}
	// }
	base+="&type="+type;
	base+="&limit=50"
	return fetch(base, {headers:{"Authorization":"Bearer "+access_token}})
	 .then((resp) => resp.json()) // Transform the data into json
	 .then(function(data) {
	 	return data;
	 })
}
songList = []
async function addToList(parameters, type){
	await getFrom(parameters, type).then(function(result) {
		items = result.tracks.items;
		for(item of items){
			songList.push(item)
		}
	})
}
function GetSortOrder(prop) { 
    return function(a, b) {
     	if(isNaN(Number(a[prop]))==false){
     	    return b[prop]-a[prop]; 
     	}
     	else{
     		return a[prop].localeCompare(b[prop]);
    	}
    }
}
function display(){
	items = songList
	items.sort(GetSortOrder("popularity"))
	items = items.slice(0,50)
	for (item of items){
		row = table.insertRow()
		playCell = row.insertCell(0)
		playLink = document.createElement("a")
		playLink.href = item.uri
		playLink.className = "valign-wrapper"
		icon = document.createElement("i")
		icon.className = "material-icons"
		icon.style = "font-size: 2.2rem"
		icon.innerHTML = "play_circle_outline"
		playLink.appendChild(icon)
		playCell.appendChild(playLink)
		nameCell = row.insertCell(1)
		artistCell = row.insertCell(2)
		albumCell = row.insertCell(3)
		popularityCell = row.insertCell(4)
		popularityCell.style = "text-align: center"
		durationCell = row.insertCell(5)
		durationCell.style = "text-align: center"

		artistCell.innerHTML = item.artists[0].name
		nameCell.innerHTML = item.name
		for(i=1; i<item.artists.length; i++){
			artistCell.innerHTML = artistCell.innerHTML + ", " + item.artists[i].name
		}
		albumCell.innerHTML = item.album.name
		popularityCell.innerHTML = item.popularity
		minutes = Math.floor(item.duration_ms/60000)
		seconds = Math.floor(item.duration_ms%60000/1000)
		if(seconds<10){
			seconds = "0" + String(seconds);
		}
		durationCell.innerHTML = minutes+ ":" + seconds
		songList = []
	}
}
