var gamePattern = [];
var userClickedPattern=[];
var colorArray = ["red","blue","green","yellow"];
var level = 1;
var started = false;



$(document).keydown(function(){
    if(!started){
        nextSequence();
        started = true;
    }
})


$(".btn").on('click',function(event){
    if(started){
        var color = event.currentTarget.id;
        userClickedPattern.push(color);
        checkAnswer(userClickedPattern.length-1);
    }
});



function nextSequence(){
    userClickedPattern=[];
    $("h1").text("Level "+level); level++;
    var randomNumber = Math.floor(Math.random()*4);
    var randomChosenColour = colorArray[randomNumber];
    
    gamePattern.push(randomChosenColour);
    animatePress(randomChosenColour);
}
function gameOver(){
    $("h1").text("Game over. Press A to Start");
    $("body").addClass("game-over");
    setTimeout(function(){
        $("body").removeClass("game-over");
    },1000);
    level = 1;
    gamePattern=[];
    userClickedPattern=[];
    started = false;
}
function animatePress(randomChosenColour){
    setTimeout(function(){
        $("#"+randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);  
    },200);
}
function checkAnswer(colorIndex){
    if(gamePattern[colorIndex]!=userClickedPattern[colorIndex]){
        var audio = new Audio('sounds/wrong.mp3');
        audio.play();
        animatePress(gamePattern[colorIndex]);
        gameOver();
    }else{
        var audio = new Audio('sounds/'+gamePattern[colorIndex]+'.mp3');
        audio.play();
        animatePress(gamePattern[colorIndex]);
        if( gamePattern.length === userClickedPattern.length){
            setTimeout(function(){
                nextSequence();
            },2000);
        }
    }
    
}