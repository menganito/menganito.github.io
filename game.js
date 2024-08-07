let nextQuestion = 0;
let score = 0;
let possibleScore = 0;
async function populate() {
  const requestURL = "countries2.json";
  const request = new Request(requestURL);
  const response = await fetch(request);
  countries = await response.json();
  //at the beginning, the button is disabled, we can enable it now that the json is loaded.
  document.getElementById("start").disabled = false;
  shuffle(countries);
}
//this is called by the pupulate function
function shuffle(array) {
  var m = array.length, t, i;

  // While there remain elements to shuffle…
  while (m) {

    // Pick a remaining element…
    i = Math.floor(Math.random() * m--);

    // And swap it with the current element.
    t = array[m];
    array[m] = array[i];
    array[i] = t;
  }

  return array;
}
//function start is called by the start button
function start() {
  document.getElementById("score_div").hidden = false;
  document.getElementById("game").hidden = false;
  document.getElementById("intro").hidden = true;
  document.getElementById("map").hidden = true;
  document.getElementById("score").innerHTML = score;
  document.getElementById("possibleScore").innerHTML = possibleScore;
  document.getElementById("topScore").innerHTML = countries.length;
  game();
}
function buildMap() {
	var map = L.map('map').setView([0, 0], 3);
	L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);
  document.getElementById("game").hidden = true;
  document.getElementById("map").hidden = false;
  console.log("map drawn");
	}
function game() {
  document.getElementById("flag").innerHTML = '<img src="flags-svg/' + countries[nextQuestion].code.toLowerCase() + '.svg" id="flag"></img>';
  //buildMap();
  }
//function is called from the answer button
function getAnswer() {
	var guessed = "wrong";
  answer = document.getElementById('answer').value;
  if (answer === countries[nextQuestion].name) {
    score++;
	guessed = "right";
	}
  possibleScore++
  document.getElementById("score").innerHTML = score;
  document.getElementById("possibleScore").innerHTML = possibleScore;
  document.getElementById("topScore").innerHTML = countries.length - possibleScore;
  if (guessed === "right") {
	let html = '<div class="correct"><img class="correct" src="flags-svg/' + countries[nextQuestion].code.toLowerCase() + '.svg"> ✔ ' + countries[nextQuestion].name + "<br/></div>";
    document.getElementById("score_counter").insertAdjacentHTML("afterbegin", html);
        } else {
    let html = '<div class="incorrect"><img class="incorrect" src="flags-svg/' + countries[nextQuestion].code.toLowerCase() + '.svg"> ❌ ' + countries[nextQuestion].name + " (you guessed: " + answer + ")<br/></div>";
	document.getElementById("score_counter").insertAdjacentHTML("afterbegin", html);
    }
  nextQuestion++;
  buildMap();
  //game();
}
populate();