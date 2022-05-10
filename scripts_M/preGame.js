
//Build cards objects
function Card(src, value) {  //Function constructor
  this.frontImage = src;
  this.value = value;
}

function makeCardsArray(details) { //Build new card objects and put them in array
  var cardsArray = [];
  for (var i=0; i< details.length; i++) {
    cardsArray.push(new Card(details[i][0], details[i][1]));
  }
  return cardsArray;  
}

// Defulte game- classic list1
var details = classic1cards;

var cardsArray = makeCardsArray(details);
console.log(cardsArray);

//Shuffle the cardsArray
function shuffle(array) {
  let currentIndex = array.length,  randomIndex;

  // While there remain elements to shuffle...
  while (currentIndex != 0) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
  }
  return array;
}

shuffle(cardsArray);
console.log(cardsArray);

// Build cell object
function Cell(status, card) { //Function constructor 
  this.status = status;
  this.card = card;
}

function makecellsArray() {   //Build new cell objects and put them in array
  var cellsArray = [];
  for (var i=0; i< cardsArray.length; i++) {
    cellsArray.push(new Cell("close", cardsArray[i]));
  }
  return cellsArray;  
}

var cellsArray = makecellsArray();

console.log(cellsArray);

//Render the images on the game board acording cell status

var backImage = "images_M/backImage.JPG";
var emptyImage = "images_M/emptyImage.png";

function renderCells () {
  for (var i=0; i < cellsArray.length; i++) {
    renderCell(cellsArray[i], i+1);
  }
}

function renderCell (cell, position) {
  var imgElem = document.getElementById("cell" + position);
  if (cell.status == "open") {
    imgElem.src = cell.card.frontImage;
  } else if (cell.status == "close") {
    imgElem.src = backImage;
  } else if (cell.status == "empty") {
    imgElem.src = emptyImage;
  }
}

//Define onclick event on navigation bar to Change cards game 
document.getElementById("mathList1").onclick = function () {onNavbarClick(math1cards)};
document.getElementById("mathList2").onclick = function () {onNavbarClick(math2cards)};
document.getElementById("mathAddingWholeTens").onclick = function () {onNavbarClick(mathAddingWholeTens)};
document.getElementById("mathSubtractWholeTens").onclick = function () {onNavbarClick(mathSubtractWholeTens)};
document.getElementById("classicList1").onclick =function() {onNavbarClick(classic1cards)};
document.getElementById("classicList2").onclick =function() {onNavbarClick(classic2cards)};
document.getElementById("readingList1").onclick =function() {onNavbarClick(reading1cards)};

//Changing images for game in diffrent theme
function onNavbarClick(imageArray) {
  details = imageArray;
  newGame();
}