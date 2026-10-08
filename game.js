let nextQuestion = 0;
let score = 0;
let possibleScore = 0;
let map = null;
let countries = [];

async function populate() {
  try {
    const requestURL = "countries2.json";
    const request = new Request(requestURL);
    const response = await fetch(request);
    if (!response.ok) {
      throw new Error("Failed to load countries2.json: " + response.status + " " + response.statusText);
    }
    countries = await response.json();
    document.getElementById("start").disabled = false;
    shuffle(countries);
  } catch (e) {
    console.error(e);
    alert("Could not load game data: " + e.message);
  }
}

function shuffle(array) {
  var m = array.length, t, i;
  while (m) {
    i = Math.floor(Math.random() * m--);
    t = array[m];
    array[m] = array[i];
    array[i] = t;
  }
  return array;
}

function start() {
  document.getElementById("score_div").hidden = false;
  document.getElementById("game").hidden = false;
  document.getElementById("intro").hidden = true;
  document.getElementById("map").hidden = true;
  document.getElementById("score").innerHTML = score;
  document.getElementById("possibleScore").innerHTML = possibleScore;
  document.getElementById("topScore").innerHTML = countries.length;
  nextQuestion = 0;
  score = 0;
  possibleScore = 0;
  document.getElementById("score_counter").innerHTML = "";
  document.getElementById("answer").value = "";
  game();
}

function buildMap() {
  document.getElementById("game").hidden = true;
  document.getElementById("map").hidden = false;
  if (!map) {
    map = L.map('map').setView([0, 0], 3);
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);
  }
  map.invalidateSize();
  console.log("map drawn");
}

function game() {
  if (nextQuestion >= countries.length) {
    document.getElementById("game").hidden = true;
    document.getElementById("intro").hidden = false;
    document.getElementById("start").innerHTML = "Play Again";
    document.getElementById("start").onclick = start;
    return;
  }
  document.getElementById("flag").innerHTML = '<img alt="flag of the country in question" src="flags-svg/' + countries[nextQuestion].code.toLowerCase() + '.svg" id="flag">';
  document.getElementById("answer").value = "";
  document.getElementById("answer").focus();
}

function getAnswer() {
  var guessed = "wrong";
  var answer = document.getElementById('answer').value;
  if (answer === countries[nextQuestion].name) {
    score++;
    guessed = "right";
  }
  possibleScore++;
  document.getElementById("score").innerHTML = score;
  document.getElementById("possibleScore").innerHTML = possibleScore;
  document.getElementById("topScore").innerHTML = countries.length - possibleScore;
  if (guessed === "right") {
    let html = '<div class="correct"><img alt="correctly guessed flag" class="correct" src="flags-svg/' + countries[nextQuestion].code.toLowerCase() + '.svg"> ✔ ' + countries[nextQuestion].name + "<br/></div>";
    document.getElementById("score_counter").insertAdjacentHTML("afterbegin", html);
  } else {
    let html = '<div class="incorrect"><img alt="incorrectly guessed flag" class="incorrect" src="flags-svg/' + countries[nextQuestion].code.toLowerCase() + '.svg"> ❌ ' + countries[nextQuestion].name + " (you guessed: " + answer + ")<br/></div>";
    document.getElementById("score_counter").insertAdjacentHTML("afterbegin", html);
  }
  nextQuestion++;
  game();
}

populate();
