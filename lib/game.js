const $ = require('jquery');
const Round = require('./round');

let canvas = document.getElementById('game');
let ctx = canvas.getContext('2d');
let speed = 100;
let audio = document.getElementById("audio");
let mode = "normal";
let activeRound = 0;

// Set Difficulty Levels
$('#set-easy-level').on('click', function(){
  if (!activeRound){
    speed = 100;
    $('#difficulty-level').html('Easy');
  };
});

$('#set-med-level').on('click', function(){
  if (!activeRound){
    speed = 50;
    $('#difficulty-level').html('Medium');
  };
});

$('#set-hard-level').on('click', function(){
  if (!activeRound){
    speed = 30;
    $('#difficulty-level').html('Hard');
  };
});

// Set Gameplay Type

$('#rave-mode').on('click', function(){
  if (!activeRound){
    mode = "rave";
    audio.play();
    activeRound = 1;
    startGame();
  };
});

$('#start-game').on('click', function(){
  if (!activeRound){
    mode = "normal";
    activeRound = 1;
    startGame();
  };
});


// Main Game Functions
function startGame(){
  renderHighScores();
  var round = new Round({interval: speed});
  var oldDirection = "left";
  var direction =  function(){
    $(document).keydown(function(e){
      if (round.snake.canMoveLeft(e, oldDirection)){
        direction = function(){
          round.snake.moveLeft();
          oldDirection = "left";
        };
      } else if (round.snake.canMoveRight(e, oldDirection)){
        direction = function(){
          round.snake.moveRight();
          oldDirection = "right";
        };
      } else if (round.snake.canMoveUp(e, oldDirection)){
        direction = function(){
          round.snake.moveUp();
          oldDirection = "up";
        };
      } else if (round.snake.canMoveDown(e, oldDirection)){
        direction = function(){
          round.snake.moveDown();
          oldDirection = "down";
        };
      }
    });
  };

  requestAnimationFrame(function gameLoop(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawCurrentCanvas(mode, round, ctx);

    if(gameEnded(round)){ gameEnds(canvas, ctx, round.snake, round.score);}
    else {
      if (round.snakeIntersectsPellet()){
        renderEatPellet(round, ctx);
      }
      direction();
      round.pellet.draw(ctx);
      setTimeout(function(){requestAnimationFrame(gameLoop);}, round.snake.interval);
    }
  });
}

function drawCurrentCanvas(mode, round, ctx){
  if(mode === "rave"){round.snake.drawTrail(ctx);}
  round.snake.draw(ctx);
}

function gameEnded(round){
  return (round.snakeIntersectsWall(canvas) || round.snake.snakeIntersectsItself());
}

function renderEatPellet(round, ctx){
  round.pellet.reset();
  round.doesPelletOverlapWithSnake();
  round.pellet.draw(ctx);
  round.snake.grow();
  round.increaseScore();
}


function renderHighScores(){
  var scores_html = "";
  var scores_array = localStorage.getItem("scores");
  if(scores_array){
  scores_array = scores_array.split(",");
  for(var i = 0; i < scores_array.length; i++) {
    scores_html = scores_html +
          "<tr><td>" +
          (i + 1) +
          "." +
          "</td><td>" +
          scores_array[i] +
          "</td></tr>";
  }}
  $('#table_body').html(scores_html);
}


function gameEnds(canvas, ctx, snake, score){
  alert("The Snake Died!");
  var scores = localStorage.getItem("scores");
  var scores_array = "";

  if(scores){
    scores_array = scores.split(',');
    scores_array.push(score);
    scores_array.sort(function(a, b){return b-a;});
    scores_array = scores_array.splice(0, 5);
  } else {
    scores_array = [score];
  }
  audio.pause();
  audio.currentTime = 0;
  localStorage.setItem("scores", scores_array);
  $('#score').html(0);

  renderHighScores();
  activeRound = 0;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}
