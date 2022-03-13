//function constructor - build card object
function Card(src, value) {
  this.frontImage = src;
  this.value = value;
}
// create cards objects
var card1 = new Card("https://publicdomainvectors.org/tn_img/princess-in-red-dress.webp", "princess in red dress");
var card2 = new Card("https://publicdomainvectors.org/tn_img/tropical-coconut-cocktail.webp", "tropical coconut cocktail");
var card3 = new Card("https://publicdomainvectors.org/tn_img/baby-with-lolipop.webp", "baby with lolipop");
var card4 = new Card("https://publicdomainvectors.org/tn_img/screaming-teenage-girl.webp", "screaming teenage girl");
var card5 = new Card("https://publicdomainvectors.org/tn_img/woman-surfboard-public-domain-vector.webp", "woman surfboard public");
var card6 = new Card("https://publicdomainvectors.org/tn_img/man-playing-violin-publicdomain.org.webp", "man playing violin");
var card7 = new Card("https://publicdomainvectors.org/tn_img/man-playing-violin-publicdomain.org.webp", "man playing violin");
var card8 = new Card("https://publicdomainvectors.org/tn_img/woman-surfboard-public-domain-vector.webp", "woman surfboard public");
var card9 = new Card("https://publicdomainvectors.org/tn_img/screaming-teenage-girl.webp", "screaming teenage girl");
var card10 = new Card("https://publicdomainvectors.org/tn_img/baby-with-lolipop.webp", "baby with lolipop");
var card11 = new Card("https://publicdomainvectors.org/tn_img/tropical-coconut-cocktail.webp", "tropical coconut cocktail");
var card12 = new Card("https://publicdomainvectors.org/tn_img/princess-in-red-dress.webp", "princess in red dress");

 //array from all the cards objects
var cardsArray = [card1, card2, card3, card4, card5, card6, card7, card8, card9, card10, card11, card12];
//shuffle function

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
//function constructor - build cell object
function Cell(status, card) {
  this.status = status;
  this.card = card;
}
// create cells objects
var cell1 = new Cell("close", cardsArray[0]);
var cell2 = new Cell("close", cardsArray[1]);
var cell3 = new Cell("close", cardsArray[2]);
var cell4 = new Cell("close", cardsArray[3]);
var cell5 = new Cell("close", cardsArray[4]);
var cell6 = new Cell("close", cardsArray[5]);
var cell7 = new Cell("close", cardsArray[6]);
var cell8 = new Cell("close", cardsArray[7]);
var cell9 = new Cell("close", cardsArray[8]);
var cell10 = new Cell("close", cardsArray[9]);
var cell11 = new Cell("close", cardsArray[10]);
var cell12 = new Cell("close", cardsArray[11]);

var cellsArray = [cell1, cell2, cell3, cell4, cell5, cell6, cell7, cell8, cell9, cell10, cell11, cell12];


console.log(cellsArray);

var backImage = "backpic.JPG";
var emptyImage = "emptypic.webp";

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

function onCellClick(event) {
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
    if (opendCell[0].card.value === opendCell[1].card.value) {
      setTimeout (function() { 
        opendCell[0].status = "empty"; 
        opendCell[1].status = "empty"; 
        renderCells();
        opendCell=[]; 
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