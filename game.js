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
  //let's shuffle the list
  countries.sort(function(){return 0.5 - Math.random()});
}
//function start is called by the start button
function start() {
  document.getElementById("score_div").hidden = false;
  document.getElementById("game").hidden = false;
  document.getElementById("intro").hidden = true;
  document.getElementById("score").innerHTML = score;
  document.getElementById("possibleScore").innerHTML = possibleScore;
  document.getElementById("topScore").innerHTML = countries.lenght;
  game();
}
function game() {
    document.getElementById("flag").innerHTML = '<img src="flags-svg/' + countries[nextQuestion].code.toLowerCase() + '.svg" height="330"></img>';
  }
//function is called from the answer button
function getAnswer() {
  answer = document.getElementById('answer').value;
  if (answer === countries[nextQuestion].name) {
    score++;
	console.log(score);
  }
  possibleScore++
  console.log(possibleScore)
  document.getElementById("score").innerHTML = score;
  document.getElementById("possibleScore").innerHTML = possibleScore;
  document.getElementById("topScore").innerHTML = countries.lenght - possibleScore;
  nextQuestion++;
  game();
}
populate();