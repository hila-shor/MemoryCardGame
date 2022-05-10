
//Defined onclick event on every board cell
for (var i=0; i < cellsArray.length; i++) {
  document.getElementById("cell" +(i+1)).onclick = onCellClick;
}

//The game- logic
var opendCell = [];
var opendCellNum = [];
var time = 0;
var timeElt = document.querySelector("#stopWatch");
var postElement = document.querySelector("#gameEndMessage");
var click = 0;
var pairCount = 0;
var timer;

// Main game function
function onCellClick(event) {
  var cellNumber = event.target.id.slice(4);
  var cell = cellsArray[cellNumber - 1];

  if (cell.status != "close"){
    return;
  }
  // Ignore more than two cards
  if (opendCell.length == 2) {
    return;
  }

  clickCount();

  // Start game watch on first click
  if (click === 1) {
    startWatch();
  }

  cell.status = "open";  
  opendCell.push(cell);
  //opendCellNum.push(cellNumber);
  
  if (opendCell.length < 2) {
    renderCells();
    return;
  }

  //Comparison of 2 open cards

  // Matching cards ?
  if (opendCell[0].card.value === opendCell[1].card.value){
    setTimeout (function() { 
      turnEmpty();
      // Win the game
    if (pairCount == 6) {   
      endGame();
    }
  }, 1000);

  // Unmatch cards
  } else {
    setTimeout (turnUnmatch, 1000);
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
function turnEmpty() {
  opendCell[0].status = "empty"; 
  opendCell[1].status = "empty"; 
  renderCells();
  opendCell=[]; 
  pairCount++;
  opendCellNum = [];
}

function endGame() {
  postElement.classList.remove("hidden");
  clearInterval(timer);
  document.getElementById("finalSec").innerHTML = "You won in " + time + " seconds  ";
  document.getElementById("finalClick").innerHTML = "and " + click + " clicks";
  setTimeout(hideCongratMassege, 3000);
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
  hideCongratMassege();
}

