/*
 * Create a list that holds all of your cards
 */
const cardList = ["fa-diamond", "fa-paper-plane-o", "fa-anchor", "fa-bolt", "fa-cube", "fa-leaf", "fa-bicycle", "fa-bomb", "fa-diamond", "fa-paper-plane-o", "fa-anchor", "fa-bolt", "fa-cube", "fa-leaf", "fa-bicycle", "fa-bomb"];
let selectedCards = [];
let timeCount = 0;
let minutes = 0; 
let timerSeconds;
let moves = 0; 
let matchedCount = 0; 
let stars = 3;
let seconds; 

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

//Check for a match with two cards
function checkForMatch(){

    if(selectedCards[0].className === selectedCards[1].className){
        $(selectedCards[0]).addClass("match");
        $(selectedCards[1]).addClass("match");
        matchedCount += 2; 
    } else {
        selectedCards.forEach((card) => {
            $(card).parent( ".card" ).removeClass("open show"); 
        });
    }
    if(hasWon()){
        endGame();
     }
     removeSelectedCards();
};



// create individual card element
function createCard(card){
    $("ul.deck").append(`<li class="card"><i class="fa ${card}"></i></li>`);
}
//initialise a new game
function initGame(){
    matchedCount = 0; 
    clearMoves();
    clearStars();
    initStars();
    initMoves();
    populateCards();
    clearTimer();
    startTimer();
}
//remove cards from the selectedCards array
function removeSelectedCards(){
    selectedCards = [];
};

//Add the moves and remove stars
function addMoves(){
    moves += 1;
    $(".moves").html(moves)
    if(moves == 15 || moves == 20){
        reduceStar();
        stars -= 1;
    }

}
//initialise moves in index.html
function initMoves(){
    $(".moves").html(moves);
}

//clear moves
function clearMoves(){
    moves = 0;
}
//clear stars
function clearStars(){
    $(".stars").empty();
}
//Add click event listener to cards
function addClickListenerFlip(){
    $('.card').click(function(event) {
        if(selectedCards.length < 2){        
            addMoves();
            event.preventDefault(); 
            $(event.target).addClass("open show");
            selectedCards.push(event.target.children[0]);
        
            if(selectedCards.length === 2) {
                setTimeout(checkForMatch, 1000);
            }
            
        }
    });

}
//boolean check for hasWon
function hasWon() {
    if (matchedCount === 16) {
        return true;
    } else {
        return false;
    }
    
};

// Clear the timer
function clearTimer(){
    window.clearTimeout(timerSeconds);
    timeCount = 0;
    minutes = 0
    minutesDisplay = (minutes < 1) ? "0" + minutes : minutes;
    seconds = (timeCount < 10) ? "0" + timeCount : timeCount;
    $("#time").empty();
    $("#timer").html(`${minutesDisplay} : ${seconds}`);

}
//start the timer
function startTimer(){
    setTimeout(function(){
        timeCount += 1;
        minutesDisplay = (minutes < 1) ? "0" + minutes : minutes;
        seconds = (timeCount < 10) ? "0" + timeCount : timeCount;  
        $("#timer").html(`${minutesDisplay} : ${seconds}`);
        if(timeCount >= 60){
            minutes += 1;
            timeCount = 0;
        }
        timerSeconds = setTimeout(startTimer, 1000);
    });
}

//initialise stars
function initStars(){
    for (let i=0; i<3; i++){
        $(".stars").append(`<li><i class="fa fa-star"></i></li>`);
    }
}

// reduce star rating
function reduceStar(){
    let stars = $(".fa-star");
    $(stars[stars.length-1]).toggleClass("fa-star fa-star-o");
}

//populate the cards with a shuffled deck
function populateCards(){
    shuffle(cardList).forEach((card) => {
        createCard(card);
    });
    addClickListenerFlip();
}

//new game
function newGame(){
    $('.fa-repeat').click(function(event){
        clearStars();
        $('ul.deck').empty();
        event.preventDefault(); 
        initGame(); 
    });
}
//Get modal element 
var modal = document.getElementById('simpleModal'); 

//Get close button
var closeBtn = document.getElementsByClassName('closeBtn')[0];



//Listen for close modal cross 
closeBtn.addEventListener('click', closeModal); 
//Listen for outside click
window.addEventListener('click', clickOutside);

//Function to open modal 
function openModal(){
    modal.style.display = 'block'; 
} 

//Function to close modal 
function closeModal(){
    modal.style.display = 'none'; 
    $('ul.deck').empty();
    initGame();
} 

//Function to clickOutside modal and close modal
function clickOutside(e){
    if(e.target == modal){
        modal.style.display = 'none'; 
        $('ul.deck').empty();
        initGame();
    }

} 

// runs when game has been won
function endGame(){
    endMessage();
    openModal();
}

//Prints correct end message depending on result
function endMessage(){
    if(stars === 3){
        var content = `Amazing! You completed in ${minutes}:${seconds} with ${moves} moves and have ${stars}/3 stars.`
        $('.winner').html(content);
    }
    if(stars === 2){
        var content = `Good work! You completed in ${minutes}:${seconds} with ${moves} moves and have ${stars}/3 stars.`
        $('.winner').html(content);
    
    }
    if(stars === 1){
        var content = `You can do it! You completed in ${minutes}:${seconds} with ${moves} moves and have ${stars}/3 stars.`
        $('.winner').html(content);
    }
}



$(window).ready(function(){
    initGame(); 
    newGame();
});