
// Games images by theme
    // MATH
var math1cards = [
  ["math/2plus2.png" , 4],
  ["math/4.png" , 4],
  ["math/3plus6.png" , 9],
  ["math/9.png" , 9],
  ["math/4plus3.png" , 7],
  ["math/7.png" , 7],
  ["math/4plus9.png" , 13],
  ["math/13.png" , 13],
  ["math/5plus7.png" , 12],
  ["math/12.png" , 12],
  ["math/7plus4.png" , 11],
  ["math/11.png", 11]
];

var math2cards = [];

    //CLASSIC

var classic1cards = [
  ["https://publicdomainvectors.org/tn_img/princess-in-red-dress.webp" , "1"],
  ["https://publicdomainvectors.org/tn_img/princess-in-red-dress.webp" , "1"],
  ["https://publicdomainvectors.org/tn_img/tropical-coconut-cocktail.webp" , "2"],
  ["https://publicdomainvectors.org/tn_img/tropical-coconut-cocktail.webp" , "2"],
  ["https://publicdomainvectors.org/tn_img/baby-with-lolipop.webp" , "3"],
  ["https://publicdomainvectors.org/tn_img/baby-with-lolipop.webp" , "3"],
  ["https://publicdomainvectors.org/tn_img/screaming-teenage-girl.webp" , "4"],
  ["https://publicdomainvectors.org/tn_img/screaming-teenage-girl.webp" , "4"],
  ["https://publicdomainvectors.org/tn_img/woman-surfboard-public-domain-vector.webp" , "5"],
  ["https://publicdomainvectors.org/tn_img/woman-surfboard-public-domain-vector.webp" , "5"],
  ["https://publicdomainvectors.org/tn_img/man-playing-violin-publicdomain.org.webp" , "6"],
  ["https://publicdomainvectors.org/tn_img/man-playing-violin-publicdomain.org.webp", "6"]
];

var classic2cards = [
  ["classic/bow.png" , 1],
  ["classic/bow.png" , 1],
  ["classic/camel.png" , 2],
  ["classic/camel.png" , 2],
  ["classic/cow_face.png" , 3],
  ["classic/cow_face.png" , 3],
  ["classic/halfway.png" , 4],
  ["classic/halfway.png" , 4],
  ["classic/pyramid.png" , 5],
  ["classic/pyramid.png" , 5],
  ["classic/twisted_monkey.png" , 6],
  ["classic/twisted_monkey.png", 6]
];

    //READING

var reading1cards = [
  ["reading/bad_p.png" , "1"],
  ["reading/bad.png" , "1"],
  ["reading/bed_p.png" , "2"],
  ["reading/bed.png" , "2"],
  ["reading/desk_p.png" , "3"],
  ["reading/desk.png" , "3"],
  ["reading/egg_p.png" , "4"],
  ["reading/egg.png" , "4"],
  ["reading/hen_p.png" , "5"],
  ["reading/hen.png" , "5"],
  ["reading/table_p.png" , "6"],
  ["reading/table.png", "6"]
];

var reading2cards = [];

//function constructor - build card object
function Card(src, value) {
  this.frontImage = src;
  this.value = value;
}

function makeCardsArray(details) {
  var cardsArray = [];
  for (var i=0; i< details.length; i++) {
    cardsArray.push(new Card(details[i][0], details[i][1]));
  }
  return cardsArray;  
}

var details = classic2cards;

var cardsArray = makeCardsArray(details);

console.log(cardsArray);


/*if () {
  cardsArray = math1cards
} else if () {
  cardsArray = math2cards
}*/



//shuffle function- shuffle the cardsArray
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

//function constructor - build cell object
function Cell(status, card) {
  this.status = status;
  this.card = card;
}

function makecellsArray() {
  var cellsArray = [];
  for (var i=0; i< cardsArray.length; i++) {
    cellsArray.push(new Cell("close", cardsArray[i]));
  }
  return cellsArray;  
}

var cellsArray = makecellsArray();


console.log(cellsArray);

var backImage = "backpic.JPG";
var emptyImage = "empty11.png";

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

for (var i=0; i < cellsArray.length; i++) {
  document.getElementById("cell" +(i+1)).onclick = onCellClick;
}
var opendCell = [];
var time = 0;
var timeElt = document.querySelector("#stopwatch");
var postElement = document.querySelector("#post");
var click = 0;
var pair = 0;

function onCellClick(event) {
 //click count
click++;
  
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

  //  change the cell status of the clicked cell for the first&sec click
  cellsArray[cellNumber - 1].status = "open";
  
  //push the cell object that clicked to array 
  opendCell.push(cellsArray[cellNumber - 1]);
    
  //Comparison of 2 open cards
  if (opendCell.length == 2) {

    //same
    if (opendCell[0].card.value === opendCell[1].card.value) {
      setTimeout (function() { 
        opendCell[0].status = "empty"; 
        opendCell[1].status = "empty"; 
        renderCells();
        opendCell=[]; 
        pair++;
      
        // win
      if (pair == 6) {   
        postElement.classList.remove("hidden");
        clearInterval(timer);
      }
    }, 1000);
    } else {
      setTimeout (function() { 
        opendCell[0].status = "close"; 
        opendCell[1].status = "close"; 
        renderCells();
        opendCell=[];
      }, 1000);
    }
  }
  renderCells();
}
renderCells();


/*for (var i=0; i<cellsArray.length; i++) {
  if (cellsArray[i].status = "empty") {
    alert("congra");
  }
}*/ 