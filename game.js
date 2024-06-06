let nextQuestion = 0;
async function populate() {
  const requestURL = "countries2.json";
  const request = new Request(requestURL);
  const response = await fetch(request);
  countries = await response.json();
  //at the beginning, the button is disabled, we can enable it now that the json is loaded.
  var button = document.getElementById("start");
  button.disabled = false;
  //let's shuffle the list
  countries.sort(function(){return 0.5 - Math.random()});
}
//function start is called by the start button
function start() {
  document.getElementById("game").hidden = false;
  document.getElementById("intro").hidden = true;
  game();
}
function game() {
 //   document.getElementById("country").innerHTML = countries[nextQuestion].name;
    document.getElementById("flag").innerHTML = '<img src="flags-svg/' + countries[nextQuestion].code.toLowerCase() + '.svg" height="330"></img>';
    console.log(countries[nextQuestion].name);
  }
function getAnswer() {
  answer = document.getElementById('answer').value;
  console.log(answer);
  nextQuestion++;
  game();
}
populate();