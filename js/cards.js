/*
    constructor for Card objects
    key - unique identity of card (1-52)
    rank - ace, 2, king, etc.
    suit - clubs, hearts, etc
    value - face value, plus 10 for J-K
    image - pic of card

*/

function Card(key, rank, suit, value, image)
{//constructor for Card object
    this.key = key;
    this.rank = rank;
    this.suit = suit;
    this.value = value;
    this.image = image;
} 

//Deck, Hand & Muck are global    
var Deck = new Array(); //Where cards are drawn from
var Hand = new Array(); //cards held in hand    
var Muck = new Array(); //discards    
 

/*
    Create and shuffle deck on page load
*/
window.onload = function()
{
    createDeck(Deck);
    shuffleDeck(Deck);   
    
};
   
/*
This function will draw num cards from the Deck into Hand

Will push previous cards in Muck (discards)
 
Once the end of the Deck has been reached, 
the remaining cards from the Deck plus the Muck 
are gathered then shuffled to accommodate the draw.
    
This simulates how cards are shuffled, dealt, 
collected and then re-shuffled and re-dealt 
as necessary    
    
/* 
    
*/    
function drawCards(num)
{
    //clear previous hand to discard (Muck)
    var NumInHand = Hand.length; //will change during loop
    for(var x=0;x<NumInHand;x++)
    {//add cards from Deck
        var card = Hand.shift();
        Muck.push(card);
        
    }
    Hand = new Array();
    
    if(Deck.length < num)
    {//take remainder, add muck, shuffle
        for(var x=0;x<num-1;x++)
        {//add cards from Deck to Muck previous to shuffle
            var card = Deck.shift();
            Muck.push(card);
        }
        Deck = Muck; //muck becomes deck
        Muck = new Array(); //clear Muck
        shuffleDeck(Deck);
    }
    
    for(var x=0;x<num;x++)
    {//add cards from Deck to hand
        var card = Deck.shift();
        Hand.push(card);
        
    }
    
    //current display of Hand contents
    showHand(Hand);
   
}//end drawCards()
 
/*
shows drawn cards using z-indexing

*/
    
function showHand(arr,game)
{
    var myDescription = '';
    var myGraphics = '';
    var left = 25;
    var top = 0;
    
    
    if(game=='blackjack')
    {
        myDescription = '<h3>Black Jack</h3>';
    }else{
        myDescription = '<h3>Draw 5 Cards</h3>';
    }
    var blackJackValue = 0;
    for(x = 0; x < arr.length; x++)
    {
        myGraphics += '<div style="position: absolute; z-index: ' + x + '; left: ' + left + 'px; top: ' + top + 'px;">';
        myGraphics += '<img style= "width:100px" src="card-images/' + arr[x].image + '" /></div>';
        left += 25;
        top += 13;
        myDescription += showCard(arr[x]);
        blackJackValue += parseInt(arr[x].value);
    }
    
    if(game=='blackjack')
    {
        myDescription += '<p>Black Jack Score: <span style="color:red"><b>' + blackJackValue + '</b></span></p>';
        
        if(blackJackValue <= 14)
        {
            myDescription += '<p>You might want to hit with that score!</p>';
        }else if(blackJackValue > 14 && blackJackValue < 17){
            myDescription += '<p>You might want to hold with that score!</p>';
        }else if(blackJackValue > 16 && blackJackValue < 21){
            myDescription += '<p>Almost anyone would hold with that score!</p>';
         }else if(blackJackValue == 21){
            myDescription += '<p>AWESOME!  I see you winning this round!</p>'; 
        }else if(blackJackValue > 21){
            myDescription += '<p>That would be a... BUST</p>';  
        }
    }
    
   
    document.getElementById("description").innerHTML = myDescription; 
    document.getElementById("graphics").innerHTML = myGraphics;
}
 
/*

function to create a deck on page load

*/
function createDeck(Deck)
{
    var suits = 'hearts,spades,clubs,diamonds';
    var ranks = 'ace,2,3,4,5,6,7,8,9,10,jack,queen,king';
    var values = '1,2,3,4,5,6,7,8,9,10,10,10,10';
    
    var key = 0;//init, will be counter
    
    //break strings into arrays
    suits = suits.split(',');
    ranks = ranks.split(',');
    values = values.split(',');

    for(var s=0;s<suits.length;s++)
    {//loop suits
        for(var r=0;r<ranks.length;r++)
        {//loop ranks
           //Deck.push(new Card(1,'Ace','Clubs',1,'ace_of_clubs.png'));   
           Deck.push(new Card(++key,ranks[r][0].toUpperCase() + ranks[r].substring(1),suits[s][0].toUpperCase() + suits[s].substring(1),values[r],ranks[r] + '_of_' + suits[s] + '.png')); 
        }
    }
    return Deck;
}
 
/*
This function was used during creation of the page to 
display the card data - no longer used

*/

function showCards(arr)
{
    var myOutput = '';
    for(x = 0; x < arr.length; x++)
    {
          myOutput += showCard(arr[x]);
    }
     document.getElementById("output").innerHTML = myOutput;
}
    
    
function showCard(myCard)
{//shows info about Card object
    myOutput = '<p>';
    myOutput += 'rank: <b>' + myCard.rank + '</b> ';
    myOutput += 'suit: <b>' + myCard.suit + '</b> ';
    myOutput += 'value: <b>' + myCard.value + '</b> ';
    return myOutput + '</p>';
}    

/**
 * Randomize array element order in-place.
 * Using Durstenfeld shuffle algorithm.
 */
function shuffleDeck(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}  
    
function playBlackJack()
{
    drawCards(3);
    showHand(Hand,'blackjack');
}