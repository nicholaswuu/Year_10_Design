
/* ––––––––––––––––––––––––– GENRE DDOWN –––––––––––––––––––––––––––––– */

function show(){
	if(document.getElementById("checkboxes").style.display === "none"){
		document.getElementById("checkboxes").style.display = "block"
	} else{
		document.getElementById("checkboxes").style.display = "none"
	}
}

/* ––––––––––––––––––––––––– YEAR SELECT –––––––––––––––––––––––––––––– */

function yearOptions(){
	var sel1 = document.getElementById('year1');
	var sel2 = document.getElementById('year2');

	for(i=1950; i<2021; i++){
		var opt1 = document.createElement('option');
		opt1.text = i;
		opt1.value = i;
		sel1.add(opt1);
		var opt2 = document.createElement('option');
		opt2.text = i;
		opt2.value = i;
		sel2.add(opt2);  
	}
	var elems = document.querySelectorAll('select');
	var instances = M.FormSelect.init(elems, options);
	}


function submit(){
	var genre = document.getElementsByName("checkboxes")
	var genresChecked = []
	for (var i=0; i<genre.length; i++) {
		if (genre[i].checked) {
		genresChecked.push(genre[i].id);
		}

  	}
  	var artists = document.getElementById("artists").value
  	var year = document.getElementById("year").value
  	document.getElementById("test1").innerHTML = "Genres: "+genresChecked+" | Artists: "+ artists +" | Year: "+ year
}

/* –––––––––––––––––––––––––––––––– GENRE SELECTION BOXES ––––––––––––––––––––––––––––––––– */

var genres = document.getElementsByClassName("check");
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
	console.log(check)
}



const access_token = "";

function getFrom(parameters, type) {

	genre = parameters.genre;
	var base = "https://api.spotify.com/v1/search?q=";
	var first = true;
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
	// console.log(result);
	var items;
		items = result.tracks.items;
		for (item of items){
			var node = document.createElement("LI");
			var textnode = document.createTextNode("Track Name: " + item.name +
			" | Artist: " + item.artists[0].name +
			" | Popularity: " + item.popularity+
			" | Duration: "+Math.floor(item.duration/1000)+"s" +
			" | Album: " + item.album.name);
			node.appendChild(textnode);
			document.getElementById("results").appendChild(node);
		}
});
}


function search(){
	var genre = check;
	var parameters = {

		"genre": genre
	}

	display(parameters, "track");
}
