const buttonColors = ["red","blue","green","yellow"];

let gamePattern = [];
let userClickedPattern = [];
let level = 0;

let started = false;

let h1Title = $("#level-title");

//Play Sound
//

function buttonSound(buttonColor) {

  switch(buttonColor) {

         case "green":
             let greenButton = new Audio("sounds/green.mp3");
             greenButton.play();
         break;
         case "red":
             let redButton = new Audio("sounds/red.mp3");
             redButton.play();
         break;
         case "yellow":
             let yellowButton = new Audio("sounds/yellow.mp3");
             yellowButton.play();
         break;
         case "blue":
            let blueButton= new Audio("sounds/blue.mp3");
             blueButton.play();
         break;
}
};


//   //Check Awnser
//   //



function checkAwnser(curentLevel) {
  if (gamePattern[curentLevel] === userClickedPattern[curentLevel]) {


    if (userClickedPattern.length === gamePattern.length){

      userClickedPattern.length = 0;
      setTimeout(function () {
        nextSequence();
      }, 1000);

    }

  }else {
    restart();

  $(h1Title).text("Game over!!! Press any key to restart😂!!!");

    $("body").addClass("game-over");
    let wrong= new Audio("sounds/wrong.mp3");
     wrong.play();

     setTimeout(() => {
           $("body").removeClass("game-over");
       }, 1000);

  };
};


//users button clicks
//
$(".btn").on("click",function () {

  let userChosenColor = $(this).attr("id");

  userClickedPattern.push(userChosenColor);


  buttonSound(userChosenColor);

  $(this).addClass("pressed");
  setTimeout(() => {
        $(this).removeClass("pressed");
    }, 100);

    checkAwnser(userClickedPattern.length-1);
});


//random sequence generated
//

  function nextSequence() {

    level++;
    $("#level-title").text("Level " + level);

    let randomNumber = Math.floor(Math.random() * 4);

    let randomChosenColor = buttonColors[randomNumber];

    flashAnimation(randomChosenColor);

    buttonSound(randomChosenColor);

    gamePattern.push(randomChosenColor);
  };

  //Game Restart
  function restart() {
    userClickedPattern.length = 0;
    gamePattern.length = 0;
    level = 0;
    started = false;
  };


//Keyboard prees
//
$(document).on("keydown", function () {
  if(!started) {
    $(".level-item").text(`Level ${level}`);
    nextSequence();
    started = true;
  };
});


//Animation
//
function flashAnimation(color) {
  $("#" + color).fadeOut(100).fadeIn(100)
};
