var buttonColors = ["red", "blue", "green", "yellow"];
var gameStarted = false;
var gamePattern = [];
var userChosenPattern = [];
var level = 0;

// start game if keyborad press detected
$(document).on("keyup", function() {
  if (gameStarted) {
    return;
  } else {
    level = 0;
    gamePattern = [];
    userChosenPattern = [];
    $("h1").text("Level " + level);
    gameStarted = true;
    nextSequence();
  }
})

// hear the user click event
$(".btn").click(function(event) {
  var userChosenColor = event.target.id;
  if (gameStarted) {
    userChosenPattern.push(userChosenColor);
    playSound(userChosenColor);
    animationPress(userChosenColor);
    checkAnswer(userChosenPattern.length - 1);
  } else {
    playSound("wrong");
    animationPress(userChosenColor);
  }
})

// check user pattern and random gamePattern
function checkAnswer(currentLevel) {
  console.log(userChosenPattern);
  console.log(gamePattern);
  console.log(currentLevel);
  console.log(level-1);
  if (userChosenPattern[currentLevel] == gamePattern[currentLevel]) {
    if (currentLevel == level - 1) {
      setTimeout(function() {
        nextSequence();
      }, 1000);
    }
    // if condition not met - nothing happen, keep waiting until next motion
  } else {
    endGame();
  }
}

function endGame() {
  $("body").addClass("game-over");
  setTimeout(function() {
    $("body").removeClass("game-over");
  }, 200)

  $("h1").text("Game Over, Press Any Key to Restart");
  gameStarted = false;
  playSound("wrong");
}


// generate a random number
function nextSequence() {
  // random number range from 0 to 4
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColor = buttonColors[randomNumber];
  playSound(randomChosenColor)
  animationPress(randomChosenColor);
  gamePattern.push(randomChosenColor);
  level++;
  $("h1").text("Level " + level);
  userChosenPattern = [];
}

// add falsh effect to the web
function animationPress(currentColor) {
  $("." + currentColor).addClass("pressed");
  setTimeout(function() {
    $("." + currentColor).removeClass("pressed");
  }, 100)
}
// make button create sound
function playSound(randomChosenColor) {
  new Audio("sounds/" + randomChosenColor + ".mp3").play();
}
