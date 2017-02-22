function generateWinningNumber(){
  return Math.ceil(Math.random()*100)
}

function shuffle(arr) {
  var unshuffledDeckSize = arr.length;
  var shuffleThisCard;
  var currentCard;

  // While there remain elements to shuffle…
  while(unshuffledDeckSize) {

    // Pick a remaining element…
    shuffleThisCard = Math.floor(Math.random() * unshuffledDeckSize--)

    // And swap it with the current element.
    currentCard = arr[unshuffledDeckSize];
    arr[unshuffledDeckSize] = arr[shuffleThisCard];
    arr[shuffleThisCard] = currentCard;
  }

  return arr;
}

function Game(){
  this.playersGuess = null;
  this.pastGuesses = [];
  this.winningNumber = generateWinningNumber();
}

Game.prototype.difference = function(){
  return Math.abs(this.playersGuess - this.winningNumber);
}

Game.prototype.isLower = function(){
  return this.playersGuess < this.winningNumber ? true : false
}

Game.prototype.playersGuessSubmission = function(num){
  if (isNaN(num) || num < 1 || num > 100) {
    throw "That is an invalid guess.";
  } else {
    this.playersGuess = num;
    return this.checkGuess(this.playersGuess);
  }
}

Game.prototype.checkGuess = function(playersGuess){
  if (Number(playersGuess) === this.winningNumber) {
    $('#hint, #submit').prop("disabled",true)
    $('#subtitle').text('Click reset to play again!');
    return "You Win!";
  } else if (this.pastGuesses.indexOf(this.playersGuess) != -1) {
    return "You have already guessed that number.";
  } else {
    this.pastGuesses.push(playersGuess);
    var length = this.pastGuesses.length;
    $('#guess' + length).text(playersGuess);

    if (this.pastGuesses.length === 5) {
      $('#hint, #submit').prop("disabled",true)
      $('#subtitle').text('Click reset to play again!');
      return "You Lose. :(";
    } else {
      console.log(this.isLower())
      if (this.isLower()) {
        $('#subtitle').text('Guess Higher!');
      } else {
        $('#subtitle').text('Guess Lower!');
      }

      if (this.difference() < 10) {
        return "You\'re burning up!";
      } else if (this.difference() < 25) {
        return "You\'re lukewarm.";
      } else if (this.difference() < 50) {
        return "You\'re a bit chilly.";
      } else {
        return "You\'re ice cold! BRRRRR";
      }
    }
  }
}

function newGame(){
  $('#hint, #submit').prop("disabled",false)
  $('#maintitle').text('Play the Guessing Game!');
  $('#subtitle').text('Guess a number between 1 and 100!');
  $('.guess').text('-');
  return new Game();
}

Game.prototype.provideHint = function(){
  var hintarr = [];
  hintarr.push(this.winningNumber);
  hintarr.push(generateWinningNumber(), generateWinningNumber(), generateWinningNumber(), generateWinningNumber())
  return shuffle(hintarr);
}

function makeGuess(game){
  var playerInput = $('#player-input').val(); // get player input
  console.log('submit button has been clicked');
  console.log(playerInput);
  console.log(game.winningNumber);
  $('#player-input').val(""); // reset player input
  var output = game.playersGuessSubmission(playerInput);
  console.log(output);
  $('#maintitle').text(output);
}

$(document).ready(function() {

  var currentGame = newGame();

  $('#submit').on('click', function() {
    makeGuess(currentGame);
  });

  $('#reset').on('click', function() {
    currentGame = newGame();

  });

  $('#hint').on('click', function() {
    var hints = 'The number is in this set: [' + currentGame.provideHint().join(", ") + "]"
    $('#subtitle').text(hints);
  });


  $('#player-input').keydown(function(event){
    if (event.keyCode == 13) {
        makeGuess(currentGame);
    }
  });

var newTitle = $('<h1> Play the Guessing Game! </h1>')

});
