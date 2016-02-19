const $ = require('jquery');
const Snake = require('./snake');
const Pellet = require('./pellet');

function Round(options){
  this.snake = new Snake({interval: options.interval});
  this.pellet = new Pellet({});
  this.score = 0;
}

Round.prototype.increaseScore = function(){
  this.score ++;
  $('#score').html(this.score);
};

Round.prototype.snakeIntersectsPellet = function(){
  return ((Math.abs(this.snake.positions[0][0] - this.pellet.x) < 10) && (Math.abs(this.snake.positions[0][1] - this.pellet.y) < 10));
};

Round.prototype.snakeIntersectsWall = function(){
  return (this.snake.positions[0][0] < 0 || this.snake.positions[0][1] < 0 || this.snake.positions[0][0] > 390 || this.snake.positions[0][1] > 290);
};

Round.prototype.doesPelletOverlapWithSnake = function(){
  var self = this;
  this.snake.positions.forEach(function(position){
    while((Math.abs(position[0] - self.pellet.x) < 10) && (Math.abs(position[1] - self.pellet.y) < 10)){
      self.pellet.reset();
    }
  });
};

module.exports = Round;
