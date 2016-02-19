function Snake(options){
  this.x = options.x || 300;
  this.y = options.y || 150;
  this.positions = options.positions || [[300,150]];
  this.height = options.height || 10;
  this.width = options.width || 10;
  this.interval = options.interval || 100;
  this.trail = [];
}

Snake.prototype.moveUp = function(){
  this.y += 10;
};

Snake.prototype.moveDown = function(){
  this.y -= 10;
};

Snake.prototype.moveRight = function(){
  this.x += 10;
};

Snake.prototype.moveLeft = function(){
  this.x -= 10;
};

Snake.prototype.grow = function(){
  this.positions.push([this.x, this.y]);
};

Snake.prototype.draw = function(context){
  context.fillStyle="#000000";
  this.positions.unshift([this.x, this.y]);
  this.trail.push(this.positions.pop());
  this.positions.forEach(function(num){
    context.fillRect(num[0], num[1], 10, 10);
  });

  return this;
};

Snake.prototype.drawTrail = function(context){
  var trailColors = ["#7FFF00", "#FF6347", "#FFFF00", "#7B68EE", "#1E90FF", "#FF00FF"];
  context.fillStyle= trailColors[randomNumber(0, this.positions.length/4)];
  this.trail.forEach(function(num){
    context.fillRect(num[0], num[1], 10, 10);
  });
};

Snake.prototype.snakeIntersectsItself = function(){
  var matchCount = 0;
  var self = this;
  this.positions.forEach(function(position){
    if((Math.abs(position[0] - self.positions[0][0]) < 10) && (Math.abs(position[1] - self.positions[0][1]) < 10)){
      matchCount ++;
    }
  });
  return matchCount > 1;
};

Snake.prototype.canMoveLeft = function(e, oldDirection){
  return (e.keyCode === 37 && (this.positions.length < 2 || oldDirection !== "right"));
};

Snake.prototype.canMoveRight = function(e, oldDirection){
  return (e.keyCode === 39 && (this.positions.length < 2 || oldDirection !== "left"));
};

Snake.prototype.canMoveUp = function(e, oldDirection){
  return (e.keyCode === 40 && (this.positions.length < 2 || oldDirection !== "down"));
};

Snake.prototype.canMoveDown = function(e, oldDirection){
  return (e.keyCode === 38 && (this.positions.length < 2 || oldDirection !== "up"));
};



function randomNumber(minimum, maximum){
    return Math.round( Math.random() * (maximum - minimum) + minimum);
}

module.exports = Snake;
