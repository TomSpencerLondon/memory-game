/*
 * Create a list that holds all of your cards
 */
const cardList = ["fa-diamond", "fa-paper-plane-o", "fa-anchor", "fa-bolt", "fa-cube", "fa-leaf", "fa-bicycle", "fa-bomb", "fa-diamond", "fa-paper-plane-o", "fa-anchor", "fa-bolt", "fa-cube", "fa-leaf", "fa-bicycle", "fa-bomb"];

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}


/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */

let memoryValues = []; 
let tilesFlipped = 0; 
function newBoard(array){
    tiles_flipped = 0;
    let output = ""
    let cards = ""
    shuffled = shuffle(array);
    for(var i = 0; i < array.length; i++){
        createCard(shuffled[i])
        $('.card').click(function(event) {
            event.preventDefault(); 
            $(event.target).addClass("open show"); 
        });
    }
    
}

// create individual card element
function createCard(card){
    $("ul.deck").append(`<li class="card"><i class="fa ${card}"></i></li>`);
}

function initGame(){
    populateCards();
}

function populateCards(){

    shuffle(cardList).forEach((card) => {
        console.log(card);
        createCard(card);
        $('.card').click(function(event) {
            event.preventDefault(); 
            $(event.target).addClass("open show"); 
        });
    });
}




$(window).ready(function(){
    newBoard(cardList); 
    $('.fa-repeat').click(function(event){
        $('ul.deck').empty();
        event.preventDefault(); 
        initGame(); 
    });
    console.log(cardList);


});