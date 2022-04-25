

// Games images by theme
    // MATH
    /*var math1cards = [
      ["images_M/math/list1_math/2plus2.png" , 4],
      ["images_M/math/list1_math/4.png" , 4],
      ["images_M/math/list1_math/3plus6.png" , 9],
      ["images_M/math/list1_math/9.png" , 9],
      ["images_M/math/list1_math/4plus3.png" , 7],
      ["images_M/math/list1_math/7.png" , 7],
      ["images_M/math/list1_math/4plus9.png" , 13],
      ["images_M/math/list1_math/13.png" , 13],
      ["images_M/math/list1_math/5plus7.png" , 12],
      ["images_M/math/list1_math/12.png" , 12],
      ["images_M/math/list1_math/7plus4.png" , 11],
      ["images_M/math/list1_math/11.png", 11]
    ];
    
    var math2cards = [];
    
        //CLASSIC
    var classic1cards = [
      ["https://publicdomainvectors.org/tn_img/princess-in-red-dress.webp" , 1],
      ["https://publicdomainvectors.org/tn_img/princess-in-red-dress.webp" , 1],
      ["https://publicdomainvectors.org/tn_img/tropical-coconut-cocktail.webp" , 2],
      ["https://publicdomainvectors.org/tn_img/tropical-coconut-cocktail.webp" , 2],
      ["https://publicdomainvectors.org/tn_img/baby-with-lolipop.webp" , 3],
      ["https://publicdomainvectors.org/tn_img/baby-with-lolipop.webp" , 3],
      ["https://publicdomainvectors.org/tn_img/screaming-teenage-girl.webp" , 4],
      ["https://publicdomainvectors.org/tn_img/screaming-teenage-girl.webp" , 4],
      ["https://publicdomainvectors.org/tn_img/woman-surfboard-public-domain-vector.webp" , 5],
      ["https://publicdomainvectors.org/tn_img/woman-surfboard-public-domain-vector.webp" , 5],
      ["https://publicdomainvectors.org/tn_img/man-playing-violin-publicdomain.org.webp" , 6],
      ["https://publicdomainvectors.org/tn_img/man-playing-violin-publicdomain.org.webp", 6]
    ];
    
    var classic2cards = [
      ["images_M/classic/list2_classic/bow.png" , 1],
      ["images_M/classic/list2_classic/bow.png" , 1],
      ["images_M/classic/list2_classic/camel.png" , 2],
      ["images_M/classic/list2_classic/camel.png" , 2],
      ["images_M/classic/list2_classic/cow_face.png" , 3],
      ["images_M/classic/list2_classic/cow_face.png" , 3],
      ["images_M/classic/list2_classic/halfway.png" , 4],
      ["images_M/classic/list2_classic/halfway.png" , 4],
      ["images_M/classic/list2_classic/pyramid.png" , 5],
      ["images_M/classic/list2_classic/pyramid.png" , 5],
      ["images_M/classic/list2_classic/twisted_monkey.png" , 6],
      ["images_M/classic/list2_classic/twisted_monkey.png", 6]
    ];
    
        //READING
    var reading1cards = [
      ["images_M/reading/list1_reading/bad_p.png" , 1],
      ["images_M/reading/list1_reading/bad.png" , 1],
      ["images_M/reading/list1_reading/bed_p.png" , 2],
      ["images_M/reading/list1_reading/bed.png" , 2],
      ["images_M/reading/list1_reading/desk_p.png" , 3],
      ["images_M/reading/list1_reading/desk.png" , 3],
      ["images_M/reading/list1_reading/egg_p.png" , 4],
      ["images_M/reading/list1_reading/egg.png" , 4],
      ["images_M/reading/list1_reading/hen_p.png" , 5],
      ["images_M/reading/list1_reading/hen.png" , 5],
      ["images_M/reading/list1_reading/table_p.png" , 6],
      ["images_M/reading/list1_reading/table.png", 6]
    ];
    
    var reading2cards = [];*/

// Build cards objects
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

//Define onclick event on navigation bar to Change cards game 
document.getElementById("mathList1").onclick = function () {onNavbarClick(math1cards)};
document.getElementById("classicList1").onclick =function() {onNavbarClick(classic1cards)};
document.getElementById("classicList2").onclick =function() {onNavbarClick(classic2cards)};
document.getElementById("readingList1").onclick =function() {onNavbarClick(reading1cards)};

//Changing images for game in diffrent theme
function onNavbarClick(imageArray) {
  details = imageArray;
  newGame();
}

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


function onCellClick(event) {
 //click count
click++;
document.getElementById("clickCount").innerHTML = click; 
 //  start stopwatch
if (click === 1) {
 
 timer = setInterval(function() {
 time++;
 timeElt.innerHTML = time;
  }, 1000);
}

  //The function stops if you click on a third card before comparing 2 cards
  if (opendCell.length == 2) {
    return
  }
  
  // find the id of the clicked cell and assign the cell number to variable
  var cellNumber = event.target.id.slice(4);
  console.log("hi cellNumber:", cellNumber);
  opendCellNum.push(cellNumber);
  console.log(opendCellNum);

  //  change the cell status of the clicked cell for the first&sec click
  //if (cellsArray[cellNumber - 1].status == "close")
  
    cellsArray[cellNumber - 1].status = "open";
  
  
  
  //push the cell object that clicked to array 
  opendCell.push(cellsArray[cellNumber - 1]);
  console.log(opendCell);  

  //Comparison of 2 open cards
  if (opendCell.length == 2) {

    if (opendCellNum[0] == opendCellNum[1]) {
      opendCell = [opendCell[0]];
      opendCell[0].status = "open";
      opendCellNum = [opendCellNum[0]];
    }

    //same
    if (opendCell[0].card.value === opendCell[1].card.value){
      setTimeout (function() { 
        opendCell[0].status = "empty"; 
        opendCell[1].status = "empty"; 
        renderCells();
        opendCell=[]; 
        pair++;
        opendCellNum = [];


        // win
      if (pair == 6) {   
        postElement.classList.remove("hidden");
        clearInterval(timer);
        document.getElementById("finalSec").innerHTML = "You won in " + time + " seconds  ";
        document.getElementById("finalClick").innerHTML = "and " + click + " clicks";
        setTimeout(hideCongratMassege, 3500);
        setTimeout(newGame, 3500);
      }
    }, 500);
    } else {
      setTimeout (function() { 
        opendCell[0].status = "close"; 
        opendCell[1].status = "close"; 
        renderCells();
        opendCell=[];
        opendCellNum= [];
      }, 500);
    }
  }
  renderCells();
}
renderCells();

function hideCongratMassege() {
  postElement.classList.add("hidden");
}

// New game
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

