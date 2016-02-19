function Pellet(options){
  this.x = options.x || 150;
  this.y = options.y || 150;
  this.height = options.height || 10;
  this.width = options.width || 10;
  this.image = new Image();
  this.image.src = 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/73/Ruby_logo.svg/100px-Ruby_logo.svg.png';
}

Pellet.prototype.draw = function(context){
  context.fillStyle="#7FFF00";
  context.drawImage(this.image, this.x, this.y, this.width, this.height);
  return this;
};

Pellet.prototype.reset = function(){
  this.x = randomNumber(0, 390);
  this.y = randomNumber(0, 290);
};

function randomNumber(minimum, maximum){
    return Math.round( Math.random() * (maximum - minimum) + minimum);
}

module.exports = Pellet;
