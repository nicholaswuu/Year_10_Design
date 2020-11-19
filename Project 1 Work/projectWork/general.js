/* –––––––––––––––––––––––––––––––– GENRE SELECTION BOXES ––––––––––––––––––––––––––––––––– */

genres = document.getElementsByClassName("check");
check = []

listofgenres = ["blues", "classical", "country", "dance", "disco", "dubstep", "edm", "electronic", "hard-rock", "heavy-metal", "hip-hop", "indie", "jazz", "k-pop", "latin", "metal", "pop", "r-n-b", "reggae", "rock", "rock-n-roll", "romance"]

for (genre of genres){
	genre.addEventListener("click", changeSize);
}
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
}


/* ––––––––––––––––––––––––– SEARCH BAR ––––––––––––––––––––––––––––––– */

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

/* ––––––––––––––––––––––––– YEAR SELECT –––––––––––––––––––––––––––––– */

function yearOptions(){
	sel1 = document.getElementById('year1');
	sel2 = document.getElementById('year2');

	for(i=2020; i>1898; i=i-1){
		opt1 = document.createElement('option');
		opt1.text = i;
		opt1.value = i;
		sel1.add(opt1);
		opt2 = document.createElement('option');
		opt2.text = i;
		opt2.value = i;
		sel2.add(opt2);  
	}
	elems = document.querySelectorAll('select');
	instances = M.FormSelect.init(elems, options);
}

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
	year1 = document.getElementById("year1");
	year2 = document.getElementById("year2");
	value1 = parseInt(year1.options[year1.selectedIndex].value);
	value2 = parseInt(year2.options[year2.selectedIndex].value);
	range = []
	for(i=value1; i<value2+1; i++){
		range.push(i)
	}
	for(i=0; i<Math.max(genre.length, 1); i++){
		for(j=0; j<Math.max(artists.length, 1); j++){
			for(k=0; k<Math.max(range.length, 1); k++){
					if(genre[i]===undefined){
						genre = [""]
					}
					console.log(genre[i])
					console.log(i)
					if(artists[j]===undefined){
						artists = [""]
					}
					if(range[k]===undefined){
						range = [""]
					}
				parameters = {
					"artist": artists[j],
					"genre": genre[i],
					"year": range[k]
				}
				display(parameters, "track")
			}
		}
	}
	tableStructure()
}


function tableStructure(){
		oldTable = document.getElementById('results');
		if(oldTable!=null)
			oldTable.parentNode.removeChild(oldTable);
		body = document.getElementsByTagName('center')[0];
  		table = document.createElement('table');
  		table.id = "results";
		thead = table.createTHead();
		row = thead.insertRow();
		row.id = "thead"
		th = document.createElement("th");
	    text = document.createTextNode("");
	    th.style = "width: 75px"
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
	    th.style = "width: 120px; text-align: center"
	    th.appendChild(text);
	    row.appendChild(th);
		body.appendChild(table);
}

/* ––––––––––––––––––––––––––––––––– SPOTIFY API –––––––––––––––––––––––––––––––– */

const access_token = "";

function getFrom(parameters, type) {
	artist = parameters.artist;
	year = parameters.year;
	genre = parameters.genre;
	base = "https://api.spotify.com/v1/search?q=";
	first = true;
	if(artist!=""){
		if(first==true){
			base+="artist%3A"+artist;
			first = false;
		}else{
			base+="%20artist%3A"+artist;
		}
	}
	if(year!=""){
		if(first==true){
			base+="year%3A"+year;
			first = false;
		}else{
			base+="%20year%3A"+year;
	}
	}
	if(genre!=""){
		if(first==true){
			base+="genre%3A"+genre;
			first = false;
		}else{
			base+="%20genre%3A"+genre;
		}
	}
	base+="&type="+type;
	base+="&limit=50"
	return fetch(base, {headers:{"Authorization":"Bearer "+access_token}})
	 .then((resp) => resp.json()) // Transform the data into json
	 .then(function(data) {
	 	return data;
	 });
}

function display(parameters, type){
	getFrom(parameters, type).then(function(result) {
		items = result.tracks.items;
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
			artistCell.innerHTML = item.artists[0].name
			nameCell.innerHTML = item.name
			for(i=1; i<item.artists.length; i++){
				artistCell.innerHTML = artistCell.innerHTML + ", " + item.artists[i].name
			}
			popularityCell.innerHTML = item.popularity
			albumCell.innerHTML = item.album.name
		}
	});
}
