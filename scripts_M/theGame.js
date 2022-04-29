
//Defined onclick event on every board cell
for (var i=0; i < cellsArray.length; i++) {
  document.getElementById("cell" +(i+1)).onclick = onCellClick;
}

//The game- logic
var opendCell = [];
var opendCellNum = [];
var time = 0;
var timeElt = document.querySelector("#stopWatch");
var postElement = document.querySelector("#post");
var click = 0;
var pair = 0;
var timer;

// Main game function
function onCellClick(event) {

  clickCount();

  // Start game watch
  if (click === 1) {
    startWatch();
  }

  // Ignore more than two cards
  if (opendCell.length == 2) {
    return;
  }
  
  // Save cell position
  var cellNumber = event.target.id.slice(4);
  console.log("hi cellNumber:", cellNumber);
  opendCellNum.push(cellNumber);
  console.log(opendCellNum);

  // Change the cell status 
  cellsArray[cellNumber - 1].status = "open";
  
  // Save two opend cards for Comparison
  opendCell.push(cellsArray[cellNumber - 1]);
  console.log(opendCell);  

  //Comparison of 2 open cards
  if (opendCell.length == 2) {

    //same card?
    if (opendCellNum[0] == opendCellNum[1]) {
      opendCell = [opendCell[0]];
      opendCell[0].status = "open";
      opendCellNum = [opendCellNum[0]];
    }

    // Match cards 
    if (opendCell[0].card.value === opendCell[1].card.value){
      setTimeout (function() { 
        pairMaker();
        // Win the game
      if (pair == 6) {   
        endGame();
      }
    }, 500);

    // Unmatch cards
    } else {
      setTimeout (function() { 
        turnUnmatch();
      }, 500);
    }
  }
  renderCells();
}

renderCells();

// Game performance time and click num
function startWatch () {
  timer = setInterval(function() {
    time++;
    timeElt.innerHTML = time;
     }, 1000);
}

function clickCount () {
  click++;
  document.getElementById("clickCount").innerHTML = click; 
}
function pairMaker() {
  opendCell[0].status = "empty"; 
  opendCell[1].status = "empty"; 
  renderCells();
  opendCell=[]; 
  pair++;
  opendCellNum = [];
}

function endGame() {
  postElement.classList.remove("hidden");
  clearInterval(timer);
  document.getElementById("finalSec").innerHTML = "You won in " + time + " seconds  ";
  document.getElementById("finalClick").innerHTML = "and " + click + " clicks";
  setTimeout(hideCongratMassege, 8500);
  setTimeout(newGame, 3500);
}

function hideCongratMassege() {
  postElement.classList.add("hidden");
}

function turnUnmatch() {
  opendCell[0].status = "close"; 
  opendCell[1].status = "close"; 
  renderCells();
  opendCell=[];
  opendCellNum= [];
}

// Reset the game with a new game
document.getElementById("newGamebtn").onclick = newGame;

function newGame() {
  clearInterval(timer);
  time = 0;
  document.getElementById("stopWatch").innerHTML = 0;
  click = 0;
  document.getElementById("clickCount").innerHTML = click; 
  cardsArray = makeCardsArray(details);
  shuffle(cardsArray);
  cellsArray = makecellsArray();
  renderCells();
  opendCell = [];
  pair = 0;
}

