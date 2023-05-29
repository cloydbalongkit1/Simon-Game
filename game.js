var buttonColors = ["green", "red", "yellow", "blue"];
var computerRandomPattern = [];
var userFollowedChoice = [];
var startGame = false;
var level = 0;


$(document).keypress(function(){
    if (!startGame) {
        $("#level-title").text("Level: " + level);
        
        computerPattern();

        startGame = true;
    }
});



//user - mouse clicked
$(".btn").click(function(){
    var clickedID = $(this).attr("id");

    userFollowedChoice.push(clickedID);

    imageAnimation(clickedID);
    audioAnimation(clickedID);

    gameDecider(userFollowedChoice.length - 1);
});


// computer random choice call

function computerPattern () {
    userFollowedChoice = [];
    level++;
    
    var randomPattern = Math.floor(Math.random() * 4);
    var randomChoice = buttonColors[randomPattern];
    computerRandomPattern.push(randomChoice);

    imageAnimation(randomChoice);
    audioAnimation(randomChoice);
}


// Animate the input = random-color Computer and User choice

function imageAnimation(inputs) {
    $("#" + inputs).addClass("pressed");

    setTimeout(function(){
        $("#" + inputs).removeClass("pressed")
    }, 100);
}


// Animate some audio during clicks and computer random choice

function audioAnimation(inputs) {
    var audio = new Audio("./sounds/" + inputs + ".mp3");
    audio.play();
}

// Game Over function

function gameOver () {
    $("h1").text("Game Over! You got it wrong.")

    $("body").addClass("game-over");
    setTimeout(function(){
        $("body").removeClass("game-over");
    }, 500);

    level = 0;
    startGame = false;
    computerRandomPattern = [];
}

// Game decider funtion

function gameDecider(gameLevel) {
    if (computerRandomPattern[gameLevel] === userFollowedChoice[gameLevel]) {
        if (computerRandomPattern.length === userFollowedChoice.length) {
            setTimeout(function(){
                computerPattern();
            }, 1000);
        }
    } else {
        gameOver();
    }
}
